import { Discussion } from '@/components/discussions/DiscussionCard';
import { NewsItem } from '@/components/news/NewsCard';
import { Project } from '@/components/projects/ProjectCard';
import { User } from '@/types/user';

// Mock data for news feed
export const getNewsFeed = (): NewsItem[] => {
  return [
    {
      id: '1',
      title: 'UN Peace Talks Resume in Geneva After Six Month Hiatus',
      summary: 'Diplomats from 12 countries gather in Geneva to restart peace negotiations after months of escalating tensions.',
      imageUrl: 'https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      source: 'Global Peace Herald',
      location: 'Geneva, Switzerland',
      published: '2025-04-02T14:30:00Z',
      commentCount: 42,
      category: 'diplomacy',
    },
    {
      id: '2',
      title: 'Humanitarian Aid Reaches Conflict-Affected Region After Ceasefire',
      summary: 'First convoy of humanitarian supplies reaches civilians after two-week ceasefire agreement.',
      imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      source: 'International Aid Monitor',
      location: 'Northern Region',
      published: '2025-04-01T09:15:00Z',
      commentCount: 28,
      category: 'humanitarian',
    },
    {
      id: '3',
      title: 'Youth-Led Peace Initiative Launches in Five Countries',
      summary: 'Cross-border program engages youth from historically conflicted regions in dialogue and cooperation.',
      imageUrl: 'https://images.pexels.com/photos/8850997/pexels-photo-8850997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      source: 'Future Peace Network',
      location: 'Multiple Locations',
      published: '2025-03-30T16:45:00Z',
      commentCount: 53,
      category: 'peace',
    },
    {
      id: '4',
      title: 'Border Tensions Rise as Diplomatic Channels Stall',
      summary: 'Military presence increases along disputed border as diplomatic negotiations reach impasse.',
      imageUrl: 'https://images.pexels.com/photos/46970/soldiers-army-demonstration-weapons-46970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      source: 'Regional Affairs Journal',
      location: 'Eastern Province',
      published: '2025-03-29T11:20:00Z',
      commentCount: 76,
      category: 'conflict',
    },
  ];
};

// Mock data for discussions
export const getDiscussions = (): Discussion[] => {
  return [
    {
      id: '1',
      title: 'Strategies for De-escalation in the Eastern Conflict',
      description: 'Discussion on peaceful approaches to reduce tensions and promote dialogue in the ongoing Eastern conflict.',
      created: '2025-03-15T10:30:00Z',
      lastActive: '2025-04-02T15:20:00Z',
      participants: 78,
      messages: 134,
      region: 'Eastern Europe',
      topic: 'Conflict Resolution',
    },
    {
      id: '2',
      title: 'Educational Exchange Programs for Peace Building',
      description: 'Sharing successful models of educational exchanges that promote cross-cultural understanding and peace.',
      created: '2025-03-20T14:45:00Z',
      lastActive: '2025-04-01T09:30:00Z',
      participants: 45,
      messages: 89,
      region: 'Global',
      topic: 'Education',
    },
    {
      id: '3',
      title: 'Media\'s Role in Conflict and Peace Reporting',
      description: 'Critical discussion about how media frames conflicts and what responsible peace journalism looks like.',
      created: '2025-03-25T08:15:00Z',
      lastActive: '2025-03-31T16:40:00Z',
      participants: 63,
      messages: 112,
      region: 'Global',
      topic: 'Media',
    },
    {
      id: '4',
      title: 'Water Resource Sharing in Contested Areas',
      description: 'Discussing frameworks for equitable water sharing in regions with overlapping territorial claims.',
      created: '2025-03-18T11:20:00Z',
      lastActive: '2025-03-30T13:15:00Z',
      participants: 51,
      messages: 97,
      region: 'Middle East',
      topic: 'Resources',
    },
  ];
};

// Mock data for projects
export const getProjects = (): Project[] => {
  return [
    {
      id: '1',
      title: 'Cross-Border Youth Orchestra',
      description: 'Building peace through music with young musicians from countries with historical tensions.',
      imageUrl: 'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2024-09-15T00:00:00Z',
      endDate: '2025-08-30T00:00:00Z',
      participantsCount: 120,
      location: 'Multiple Cities',
      status: 'active',
    },
    {
      id: '2',
      title: 'Community Dialogue Workshops',
      description: 'Facilitating structured dialogue between communities affected by recent conflicts.',
      imageUrl: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2025-01-10T00:00:00Z',
      endDate: null,
      participantsCount: 85,
      location: 'Regional Centers',
      status: 'active',
    },
    {
      id: '3',
      title: 'Environmental Cooperation Initiative',
      description: 'Joint conservation efforts in shared ecosystems across borders to promote cooperation.',
      imageUrl: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2024-11-05T00:00:00Z',
      endDate: '2025-07-15T00:00:00Z',
      participantsCount: 68,
      location: 'Border Regions',
      status: 'active',
    },
    {
      id: '4',
      title: 'Digital Peace Journalism Training',
      description: 'Training journalists in conflict-sensitive reporting and digital storytelling techniques.',
      imageUrl: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      startDate: '2025-06-01T00:00:00Z',
      endDate: '2025-09-30T00:00:00Z',
      participantsCount: 40,
      location: 'Online & In-Person',
      status: 'planned',
    },
  ];
};

// Mock user data
export const getCurrentUser = (): User => {
  return {
    id: '1',
    name: 'Maya Johnson',
    username: 'mayajohnson',
    email: 'maya@zyphoria.org',
    bio: 'Peace advocate and community organizer working on cross-cultural dialogue initiatives. Passionate about using communication to bridge divides.',
    location: 'Montreal, Canada',
    avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    joinedDate: '2024-01-15T00:00:00Z',
    discussionsCount: 24,
    projectsCount: 5,
    peaceActionsCount: 12,
    peacePledge: 'I pledge to promote understanding through active listening and respectful dialogue, even with those whose views differ from my own.',
    interests: ['Conflict Resolution', 'Cross-Cultural Communication', 'Educational Outreach'],
    languages: ['English', 'French', 'Spanish'],
    organizations: [
      {
        id: '1',
        name: 'Global Peace Network',
        role: 'Regional Coordinator',
      },
      {
        id: '2',
        name: 'Youth Dialogue Initiative',
        role: 'Facilitator',
      },
    ],
  };
};