export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  importance: 'short' | 'long' | 'both';
  orderIndex: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  slug: string;
  icon: string;
  description: string;
}

export const PRE_SEEDED_SUBJECTS: Subject[] = [
  {
    id: "sub-1",
    name: "Introduction to Fictional and Non-fictional Narrative",
    code: "ENG-201",
    slug: "fictional-nonfictional-narrative",
    icon: "📖",
    description: "POV, tone, theme — fiction & non-fiction theory, genres, and close textbook readings."
  },
  {
    id: "sub-2",
    name: "World Literature",
    code: "ENG-203",
    slug: "world-literature",
    icon: "🌍",
    description: "Ancient Epics, African, Arab, Latin American, Asian, and European comparative literature frameworks."
  },
  {
    id: "sub-3",
    name: "Semiotics",
    code: "ENG-205",
    slug: "semiotics",
    icon: "🔣",
    description: "Signs, signifiers, Saussure to Roland Barthes — core systems of meaning and visual signs."
  },
  {
    id: "sub-4",
    name: "Human Rights",
    code: "HRS-201",
    slug: "human-rights",
    icon: "⚖️",
    description: "UN HR Charter, last sermon values, constitutional frameworks, and regional South Asian issues."
  },
  {
    id: "sub-5",
    name: "Environmental Science",
    code: "ESCI-201",
    slug: "environmental-science",
    icon: "🌱",
    description: "Atmosphere layers, ecosystem segments, pollution classifications, GIS, and global climate protocols."
  },
  {
    id: "sub-6",
    name: "Applications of ICT",
    code: "INCT-201",
    slug: "applications-of-ict",
    icon: "💻",
    description: "Computer hardware history, number system conversions, memory organization, and network topologies."
  }
];

export const TOPICS_REGISTRY: Topic[] = [
  // ENG-201: Narrative
  { id: "top-101", subjectId: "sub-1", title: "Definitions and distinctions between fictional and nonfictional narratives", importance: "both", orderIndex: 1 },
  { id: "top-102", subjectId: "sub-1", title: "Key Forms: Novel, Short Story, and Novella structural components", importance: "short", orderIndex: 2 },
  { id: "top-103", subjectId: "sub-1", title: "Key Concepts: Plot Structure, Characterization, Point of View, Style and Tone", importance: "long", orderIndex: 3 },
  { id: "top-104", subjectId: "sub-1", title: "Forms of Non-fictional Narrative: Personal Essay, Biography, Travelogues, and Memoirs", importance: "both", orderIndex: 4 },
  
  // ENG-203: World Lit
  { id: "top-201", subjectId: "sub-2", title: "Introduction to World Literature and the role of Translation (David Damrosch)", importance: "long", orderIndex: 1 },
  { id: "top-202", subjectId: "sub-2", title: "Ancient Epics & Mythologies (Gilgamesh, Mahabharata, Odyssey, Divine Comedy)", importance: "long", orderIndex: 2 },
  { id: "top-203", subjectId: "sub-2", title: "Postcolonial African Narrative: Chinua Achebe's Things Fall Apart analysis", importance: "both", orderIndex: 3 },

  // ENG-205: Semiotics
  { id: "top-301", subjectId: "sub-3", title: "Introduction to Semiotics: Sign, Signifier and Signified (Ferdinand de Saussure)", importance: "both", orderIndex: 1 },
  { id: "top-302", subjectId: "sub-3", title: "Peirce's Triadic Triad: Symbolic Signs, Iconic Signs, and Indexical Signs", importance: "long", orderIndex: 2 },
  { id: "top-303", subjectId: "sub-3", title: "Structural relationships: Paradigmatic and Syntagmatic relations", importance: "short", orderIndex: 3 },

  // HRS-201: Human Rights
  { id: "top-401", subjectId: "sub-4", title: "The Last Address of the Holy Prophet (PBUH) as a foundational HR charter", importance: "both", orderIndex: 1 },
  { id: "top-402", subjectId: "sub-4", title: "The United Nations Human Rights Charter & Universal Declaration of HR", importance: "long", orderIndex: 2 },
  { id: "top-403", subjectId: "sub-4", title: "Three Key Principles: Inalienability, Indivisibility, and Universality", importance: "short", orderIndex: 3 },

  // ESCI-201: Environmental Science
  { id: "top-501", subjectId: "sub-5", title: "Atmosphere Composition and Layered Structure (Troposphere, Stratosphere, etc.)", importance: "long", orderIndex: 1 },
  { id: "top-502", subjectId: "sub-5", title: "Atmospheric Pollution: Core criteria pollutants (COx, NOx, SOx, Particulate Matter)", importance: "both", orderIndex: 2 },
  { id: "top-503", subjectId: "sub-5", title: "International Agreements: Montreal Protocol and Kyoto Protocol parameters", importance: "short", orderIndex: 3 },

  // INCT-201: ICT
  { id: "top-601", subjectId: "sub-6", title: "Brief history of Computers: Four stages of computing history", importance: "short", orderIndex: 1 },
  { id: "top-602", subjectId: "sub-6", title: "Number systems conversions and computational arithmetic states", importance: "long", orderIndex: 2 },
  { id: "top-603", subjectId: "sub-6", title: "Network Topologies: Structural design of Star, Bus, Ring, and LAN architectures", importance: "both", orderIndex: 3 }
];
