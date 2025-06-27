
export interface ManualSection {
  id: string;
  title: string;
  level: number;
  parent?: string;
  pdfPath?: string;
  pageNumber?: number;
  content?: string;
  children?: string[];
}

export interface Manual {
  id: string;
  title: string;
  description: string;
  sections: ManualSection[];
}

export const userHandbook: Manual = {
  id: 'user-handbook',
  title: 'Radar System User Handbook',
  description: 'Operation and maintenance manual for radar systems',
  sections: [
    {
      id: 'uh-intro',
      title: 'Introduction',
      level: 1,
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 1,
      content: 'Welcome to the Radar System User Handbook. This manual provides comprehensive guidance for operating and maintaining radar systems.',
      children: ['uh-overview', 'uh-safety']
    },
    {
      id: 'uh-overview',
      title: 'System Overview',
      level: 2,
      parent: 'uh-intro',
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 5,
      content: 'The radar system consists of multiple integrated components working together to provide accurate target detection and tracking capabilities.'
    },
    {
      id: 'uh-safety',
      title: 'Safety Guidelines',
      level: 2,
      parent: 'uh-intro',
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 12,
      content: 'Critical safety procedures and precautions that must be followed when operating radar equipment.'
    },
    {
      id: 'uh-operation',
      title: 'System Operation',
      level: 1,
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 20,
      content: 'Detailed procedures for operating the radar system under various conditions.',
      children: ['uh-startup', 'uh-calibration', 'uh-monitoring']
    },
    {
      id: 'uh-startup',
      title: 'System Startup Procedures',
      level: 2,
      parent: 'uh-operation',
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 22,
      content: 'Step-by-step procedures for safely starting up the radar system.'
    },
    {
      id: 'uh-calibration',
      title: 'Calibration Procedures',
      level: 2,
      parent: 'uh-operation',
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 35,
      content: 'How to perform system calibration to ensure optimal performance.'
    },
    {
      id: 'uh-monitoring',
      title: 'System Monitoring',
      level: 2,
      parent: 'uh-operation',
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 48,
      content: 'Monitoring system performance and identifying potential issues.'
    },
    {
      id: 'uh-maintenance',
      title: 'Maintenance',
      level: 1,
      pdfPath: '/manuals/user-handbook.pdf',
      pageNumber: 60,
      content: 'Regular maintenance procedures to keep the system operating efficiently.'
    }
  ]
};

export const technicalManual: Manual = {
  id: 'technical-manual',
  title: 'Radar System Technical Manual',
  description: 'Detailed technical specifications and repair procedures',
  sections: [
    {
      id: 'tm-architecture',
      title: 'System Architecture',
      level: 1,
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 1,
      content: 'Comprehensive overview of the radar system architecture, including hardware and software components.',
      children: ['tm-hardware', 'tm-software', 'tm-interfaces']
    },
    {
      id: 'tm-hardware',
      title: 'Hardware Components',
      level: 2,
      parent: 'tm-architecture',
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 8,
      content: 'Detailed specifications and descriptions of all hardware components in the radar system.'
    },
    {
      id: 'tm-software',
      title: 'Software Architecture',
      level: 2,
      parent: 'tm-architecture',
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 25,
      content: 'Software modules, algorithms, and data processing workflows.'
    },
    {
      id: 'tm-interfaces',
      title: 'System Interfaces',
      level: 2,
      parent: 'tm-architecture',
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 42,
      content: 'Communication protocols and interface specifications.'
    },
    {
      id: 'tm-diagnostics',
      title: 'Diagnostics & Troubleshooting',
      level: 1,
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 55,
      content: 'Advanced diagnostic procedures and troubleshooting guides for technical personnel.',
      children: ['tm-error-codes', 'tm-repair']
    },
    {
      id: 'tm-error-codes',
      title: 'Error Codes Reference',
      level: 2,
      parent: 'tm-diagnostics',
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 58,
      content: 'Complete reference of system error codes and their meanings.'
    },
    {
      id: 'tm-repair',
      title: 'Repair Procedures',
      level: 2,
      parent: 'tm-diagnostics',
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 75,
      content: 'Step-by-step repair procedures for common hardware failures.'
    },
    {
      id: 'tm-specifications',
      title: 'Technical Specifications',
      level: 1,
      pdfPath: '/manuals/technical-manual.pdf',
      pageNumber: 95,
      content: 'Complete technical specifications, performance parameters, and operational limits.'
    }
  ]
};

export const getManual = (type: string): Manual => {
  return type === 'technical' ? technicalManual : userHandbook;
};

export const getAllSections = (): ManualSection[] => {
  return [...userHandbook.sections, ...technicalManual.sections];
};
