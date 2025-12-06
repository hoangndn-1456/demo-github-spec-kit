import JSZip from 'jszip';
import type { PortfolioData } from '../types/index';
import basicTemplateHtml from '../templates/basic/index.html?raw';
import basicTemplateCss from '../templates/basic/style.css?raw';

function replacePlaceholders(template: string, data: PortfolioData): string {
    let result = template;

    // Replace basic fields
    result = result.replace(/\{\{name\}\}/g, data.basics.name || '');
    result = result.replace(/\{\{label\}\}/g, data.basics.label || '');
    result = result.replace(/\{\{email\}\}/g, data.basics.email || '');
    result = result.replace(/\{\{url\}\}/g, data.basics.url || '');
    result = result.replace(/\{\{summary\}\}/g, data.basics.summary || '');
    result = result.replace(/\{\{location\}\}/g, data.basics.location || '');

    // Handle work section
    if (data.work && data.work.length > 0) {
        const workHtml = data.work.map(w => `
      <li>
        <h3>${w.position} at ${w.name}</h3>
        <p class="dates">${w.startDate} - ${w.endDate || 'Present'}</p>
        <p>${w.summary || ''}</p>
      </li>
    `).join('');
        result = result.replace(/\{\{#work\.length\}\}[\s\S]*?\{\{#work\}\}[\s\S]*?\{\{\/work\}\}[\s\S]*?\{\{\/work\.length\}\}/g,
            `<section id="experience"><h2>Experience</h2><ul>${workHtml}</ul></section>`);
    } else {
        result = result.replace(/\{\{#work\.length\}\}[\s\S]*?\{\{\/work\.length\}\}/g, '');
    }

    // Handle projects section
    if (data.projects && data.projects.length > 0) {
        const projectsHtml = data.projects.map(p => `
      <li>
        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
        ${p.url ? `<a href="${p.url}" target="_blank">View Project</a>` : ''}
      </li>
    `).join('');
        result = result.replace(/\{\{#projects\.length\}\}[\s\S]*?\{\{#projects\}\}[\s\S]*?\{\{\/projects\}\}[\s\S]*?\{\{\/projects\.length\}\}/g,
            `<section id="projects"><h2>Projects</h2><ul>${projectsHtml}</ul></section>`);
    } else {
        result = result.replace(/\{\{#projects\.length\}\}[\s\S]*?\{\{\/projects\.length\}\}/g, '');
    }

    // Handle skills section
    if (data.skills && data.skills.length > 0) {
        const skillsHtml = data.skills.map(s => `<li>${s.name}</li>`).join('');
        result = result.replace(/\{\{#skills\.length\}\}[\s\S]*?\{\{#skills\}\}[\s\S]*?\{\{\/skills\}\}[\s\S]*?\{\{\/skills\.length\}\}/g,
            `<section id="skills"><h2>Skills</h2><ul class="skills-list">${skillsHtml}</ul></section>`);
    } else {
        result = result.replace(/\{\{#skills\.length\}\}[\s\S]*?\{\{\/skills\.length\}\}/g, '');
    }

    // Handle education section
    if (data.education && data.education.length > 0) {
        const educationHtml = data.education.map(e => `
      <li>
        <h3>${e.studyType || ''} in ${e.area || ''}</h3>
        <p>${e.institution} (${e.startDate || ''} - ${e.endDate || ''})</p>
      </li>
    `).join('');
        result = result.replace(/\{\{#education\.length\}\}[\s\S]*?\{\{#education\}\}[\s\S]*?\{\{\/education\}\}[\s\S]*?\{\{\/education\.length\}\}/g,
            `<section id="education"><h2>Education</h2><ul>${educationHtml}</ul></section>`);
    } else {
        result = result.replace(/\{\{#education\.length\}\}[\s\S]*?\{\{\/education\.length\}\}/g, '');
    }

    // Clean up conditional email/url tags
    if (data.basics.email) {
        result = result.replace(/\{\{#email\}\}/g, '').replace(/\{\{\/email\}\}/g, '');
    } else {
        result = result.replace(/\{\{#email\}\}[\s\S]*?\{\{\/email\}\}/g, '');
    }

    if (data.basics.url) {
        result = result.replace(/\{\{#url\}\}/g, '').replace(/\{\{\/url\}\}/g, '');
    } else {
        result = result.replace(/\{\{#url\}\}[\s\S]*?\{\{\/url\}\}/g, '');
    }

    return result;
}

export async function exportPortfolio(data: PortfolioData): Promise<void> {
    const zip = new JSZip();

    // Generate HTML from template
    const html = replacePlaceholders(basicTemplateHtml, data);

    // Add files to zip
    zip.file('index.html', html);
    zip.file('style.css', basicTemplateCss);

    // Generate and download
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.basics.name?.replace(/\s+/g, '-').toLowerCase() || 'portfolio'}-site.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
