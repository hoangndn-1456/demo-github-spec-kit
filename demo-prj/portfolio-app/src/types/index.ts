export interface SocialProfile {
    network: string;
    username: string;
    url: string;
}

export interface Basics {
    name: string;
    label?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: string;
    profiles?: SocialProfile[];
}

export interface WorkExperience {
    name: string;
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
}

export interface Project {
    name: string;
    description?: string;
    highlights?: string[];
    url?: string;
}

export interface Education {
    institution: string;
    area?: string;
    studyType?: string;
    startDate?: string;
    endDate?: string;
}

export interface Skill {
    name: string;
    level?: string;
    keywords?: string[];
}

export interface PortfolioData {
    basics: Basics;
    work?: WorkExperience[];
    projects?: Project[];
    education?: Education[];
    skills?: Skill[];
}

export const defaultPortfolio: PortfolioData = {
    basics: {
        name: '',
        label: '',
        email: '',
        phone: '',
        url: '',
        summary: '',
        location: '',
        profiles: [],
    },
    work: [],
    projects: [],
    education: [],
    skills: [],
};
