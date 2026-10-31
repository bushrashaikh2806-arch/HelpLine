import type { LegalUpdate } from '../types';
import { UPDATES_DATA } from '../data/updatesData';

export interface FeedSourceConfig {
  name: string;
  url: string;
  feedType: 'rss' | 'api' | 'scraper';
  status: 'mock_active' | 'future_integration';
}

export const CONFIGURED_FEEDS: FeedSourceConfig[] = [
  {
    name: 'Press Information Bureau (PIB) - Law & Justice',
    url: 'https://pib.gov.in/RssMain.aspx?ModId=6',
    feedType: 'rss',
    status: 'future_integration',
  },
  {
    name: 'The Gazette of India (e-Gazette)',
    url: 'https://egazette.gov.in',
    feedType: 'api',
    status: 'future_integration',
  },
  {
    name: 'PRS Legislative Research - Bills & Acts',
    url: 'https://prsindia.org/billtrack',
    feedType: 'scraper',
    status: 'future_integration',
  },
];

class UpdatesService {
  /**
   * Fetches latest legal updates.
   * Currently serving curated local demo data.
   * Ready for future FastAPI / backend proxy integration.
   */
  async getUpdates(category?: string): Promise<LegalUpdate[]> {
    // Simulate slight network latency for realistic UX
    await new Promise(resolve => setTimeout(resolve, 200));

    let data = [...UPDATES_DATA];
    if (category && category !== 'All') {
      data = data.filter(item => item.category === category);
    }

    // Sort descending by date
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Placeholder method for live feed synchronization.
   * When connected to a backend proxy or RSS parser, this method
   * will fetch real-time items from PIB and e-Gazette.
   */
  async syncLiveFeeds(): Promise<{ success: boolean; message: string; timestamp: string }> {
    return {
      success: true,
      message: 'Demo mode active. Live API pipeline to PIB & e-Gazette is architected and ready for backend deployment.',
      timestamp: new Date().toISOString(),
    };
  }
}

export const updatesService = new UpdatesService();
