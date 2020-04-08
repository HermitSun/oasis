import { BasicResponse } from '~/interfaces/responses/BasicResponse';
import { SearchFullResponse } from '~/interfaces/responses/search/SearchResponse';

const basicSearchMockData: BasicResponse<SearchFullResponse> = {
  code: 200,
  msg: 'success',
  data: {
    papers: [
      {
        id: '0',
        title: 'Programs are abstract data types',
        authors: [
          { name: 'M. Erwig', id: '1' },
          { name: 'M. Erwig', id: '1' },
          { name: 'M. Erwig', id: '1' }
        ],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'conferences',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      },
      {
        id: '1',
        title: 'Programs are abstract data types',
        authors: [{ name: 'M. Erwig', id: '1' }],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'periodicals',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      },
      {
        id: '2',
        title: 'Programs are abstract data types',
        authors: [{ name: 'M. Erwig', id: '1' }],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'conferences',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      },
      {
        id: '3',
        title: 'Programs are abstract data types',
        authors: [{ name: 'M. Erwig', id: '1' }],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'periodicals',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      },
      {
        id: '4',
        title: 'Programs are abstract data types',
        authors: [{ name: 'M. Erwig', id: '1' }],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'conferences',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      },
      {
        id: '5',
        title: 'Programs are abstract data types',
        authors: [{ name: 'M. Erwig', id: '1' }],
        _abstract:
          'We propose to view programs as abstract data types and to perform program changes by applying well-defined operations on programs. The ADT view of programs goes beyond the approach of syntax-directed editors and proof-editors since it is possible to combine basic update operations into larger update programs that can be stored and reused. It is crucial for the design of update operations and their composition to know which properties they can preserve when they are applied to a program. The author argues in favor of the abstract data type view of programs, and presents a general framework in which different programming languages, update languages, and properties can be studied.',
        // publicationTitle:
        //   'Proceedings 16th Annual International Conference on Automated Software Engineering (ASE 2001)',
        publicationYear: 2001,
        metrics: {
          citationCountPaper: 2,
          citationCountPatent: 0,
          totalDownloads: 46
        },
        keywords: [
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching',
          'Costs',
          'Calculus',
          'Computer languages',
          'Software maintenance',
          'Programming profession',
          'Program processors',
          'Error correction',
          'Reactive power',
          'Synthesizers',
          'Pattern matching'
        ],
        contentType: 'periodicals',
        publicationName: 'ASE',
        link: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=989838'
      }
    ],
    size: 3910
  }
};
export default basicSearchMockData;
