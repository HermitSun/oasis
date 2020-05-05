import { KeywordAdvancedRankingResponse } from '~/interfaces/responses/ranking/advanced/KeywordAdvancedRankingResponse';
import { BasicResponse } from '~/interfaces/responses/BasicResponse';

const keywordAdvancedRankingMockData: BasicResponse<KeywordAdvancedRankingResponse[]> = {
  code: 200,
  msg: 'Success',
  data: [
    {
      keyword: 'keyword1',
      count: 67,
      citation: 7,
      authorNum: 67,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword2',
      count: 60,
      citation: 234,
      authorNum: 51,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword3',
      count: 57,
      citation: 70,
      authorNum: 54,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword4',
      count: 56,
      citation: 18,
      authorNum: 43,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword5',
      count: 55,
      citation: 143,
      authorNum: 52,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword6',
      count: 49,
      citation: 0,
      authorNum: 45,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword7',
      count: 45,
      citation: 71,
      authorNum: 43,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword8',
      count: 43,
      citation: 4,
      authorNum: 40,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword9',
      count: 42,
      citation: 44,
      authorNum: 39,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    },
    {
      keyword: 'keyword10',
      count: 42,
      citation: 88,
      authorNum: 38,
      publicationTrend: [6, 15, 2, 3, 8, 9, 7, 10, 9, 1],
      mostInfluentialPapers: [
        {
          publicationYear: 2013,
          title:
            'Analysis of the Passive Damping Losses in LCL-Filter-Based Grid Converters',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6324450'
        },
        {
          publicationYear: 2013,
          title:
            'Design Optimization of Transformerless Grid-Connected PV Inverters Including Reliability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6202700'
        },
        {
          publicationYear: 2013,
          title:
            'Hybrid AC–DC Microgrids With Energy Storages and Progressive Energy Flow Tuning',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/6249790'
        },
        {
          publicationYear: 2017,
          title:
            'Grid-Current-Feedback Control for LCL-Filtered Grid Converters With Enhanced Stability',
          publicationName: 'TPEL',
          link: 'https://ieeexplore.ieee.org/document/7491243'
        },
        {
          publicationYear: 2012,
          title:
            'High-Frequency-Injection-Assisted “Active-Flux”-Based Sensorless Vector Control of Reluctance Synchronous Motors, With Experiments From Zero Speed',
          publicationName: 'TIA',
          link: 'https://ieeexplore.ieee.org/document/6338285'
        }
      ]
    }
  ]
};

export default keywordAdvancedRankingMockData;
