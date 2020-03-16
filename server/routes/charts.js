const path = require('path');
const { createCanvas } = require('canvas');
const echarts = require('echarts');

const { Router } = require('express');
const router = Router();

const data = {
  nodes: [
    {
      id: '0',
      name: 'Myriel',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '1',
      name: 'Napoleon',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '2',
      name: 'MlleBaptistine',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '3',
      name: 'MmeMagloire',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '4',
      name: 'CountessDeLo',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '5',
      name: 'Geborand',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '6',
      name: 'Champtercier',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '7',
      name: 'Cravatte',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '8',
      name: 'Count',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '9',
      name: 'OldMan',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 0
      },
      value: 10,
      category: 0,
      draggable: true
    },
    {
      id: '10',
      name: 'Labarre',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '11',
      name: 'Valjean',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '12',
      name: 'Marguerite',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '13',
      name: 'MmeDeR',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '14',
      name: 'Isabeau',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '15',
      name: 'Gervais',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '16',
      name: 'Tholomyes',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '17',
      name: 'Listolier',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '18',
      name: 'Fameuil',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '19',
      name: 'Blacheville',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '20',
      name: 'Favourite',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '21',
      name: 'Dahlia',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '22',
      name: 'Zephine',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '23',
      name: 'Fantine',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '24',
      name: 'MmeThenardier',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '25',
      name: 'Thenardier',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '26',
      name: 'Cosette',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '27',
      name: 'Javert',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '28',
      name: 'Fauchelevent',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 4
      },
      value: 10,
      category: 4,
      draggable: true
    },
    {
      id: '29',
      name: 'Bamatabois',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '30',
      name: 'Perpetue',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '31',
      name: 'Simplice',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 2
      },
      value: 10,
      category: 2,
      draggable: true
    },
    {
      id: '32',
      name: 'Scaufflaire',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '33',
      name: 'Woman1',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '34',
      name: 'Judge',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '35',
      name: 'Champmathieu',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '36',
      name: 'Brevet',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '37',
      name: 'Chenildieu',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '38',
      name: 'Cochepaille',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 3
      },
      value: 10,
      category: 3,
      draggable: true
    },
    {
      id: '39',
      name: 'Pontmercy',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '40',
      name: 'Boulatruelle',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '41',
      name: 'Eponine',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '42',
      name: 'Anzelma',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '43',
      name: 'Woman2',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '44',
      name: 'MotherInnocent',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 4
      },
      value: 10,
      category: 4,
      draggable: true
    },
    {
      id: '45',
      name: 'Gribier',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 4
      },
      value: 10,
      category: 4,
      draggable: true
    },
    {
      id: '46',
      name: 'Jondrette',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 5
      },
      value: 10,
      category: 5,
      draggable: true
    },
    {
      id: '47',
      name: 'MmeBurgon',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 5
      },
      value: 10,
      category: 5,
      draggable: true
    },
    {
      id: '48',
      name: 'Gavroche',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '49',
      name: 'Gillenormand',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '50',
      name: 'Magnon',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '51',
      name: 'MlleGillenormand',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '52',
      name: 'MmePontmercy',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '53',
      name: 'MlleVaubois',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '54',
      name: 'LtGillenormand',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '55',
      name: 'Marius',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '56',
      name: 'BaronessT',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 6
      },
      value: 10,
      category: 6,
      draggable: true
    },
    {
      id: '57',
      name: 'Mabeuf',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '58',
      name: 'Enjolras',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '59',
      name: 'Combeferre',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '60',
      name: 'Prouvaire',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '61',
      name: 'Feuilly',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '62',
      name: 'Courfeyrac',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '63',
      name: 'Bahorel',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '64',
      name: 'Bossuet',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '65',
      name: 'Joly',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '66',
      name: 'Grantaire',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '67',
      name: 'MotherPlutarch',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '68',
      name: 'Gueulemer',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '69',
      name: 'Babet',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '70',
      name: 'Claquesous',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '71',
      name: 'Montparnasse',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '72',
      name: 'Toussaint',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 1
      },
      value: 10,
      category: 1,
      draggable: true
    },
    {
      id: '73',
      name: 'Child1',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '74',
      name: 'Child2',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    },
    {
      id: '75',
      name: 'Brujon',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 7
      },
      value: 10,
      category: 7,
      draggable: true
    },
    {
      id: '76',
      name: 'MmeHucheloup',
      itemStyle: null,
      symbolSize: 10,
      x: null,
      y: null,
      attributes: {
        modularity_class: 8
      },
      value: 10,
      category: 8,
      draggable: true
    }
  ],
  links: [
    {
      id: '0',
      name: null,
      source: '1',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '1',
      name: null,
      source: '2',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '2',
      name: null,
      source: '3',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '3',
      name: null,
      source: '3',
      target: '2',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '4',
      name: null,
      source: '4',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '5',
      name: null,
      source: '5',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '6',
      name: null,
      source: '6',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '7',
      name: null,
      source: '7',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '8',
      name: null,
      source: '8',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '9',
      name: null,
      source: '9',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '13',
      name: null,
      source: '11',
      target: '0',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '11',
      target: '2',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '11',
      name: null,
      source: '11',
      target: '3',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '10',
      name: null,
      source: '11',
      target: '10',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '14',
      name: null,
      source: '12',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '15',
      name: null,
      source: '13',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '16',
      name: null,
      source: '14',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '17',
      name: null,
      source: '15',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '18',
      name: null,
      source: '17',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '19',
      name: null,
      source: '18',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '20',
      name: null,
      source: '18',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '21',
      name: null,
      source: '19',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '22',
      name: null,
      source: '19',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '23',
      name: null,
      source: '19',
      target: '18',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '24',
      name: null,
      source: '20',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '25',
      name: null,
      source: '20',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '26',
      name: null,
      source: '20',
      target: '18',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '27',
      name: null,
      source: '20',
      target: '19',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '28',
      name: null,
      source: '21',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '29',
      name: null,
      source: '21',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '30',
      name: null,
      source: '21',
      target: '18',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '31',
      name: null,
      source: '21',
      target: '19',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '32',
      name: null,
      source: '21',
      target: '20',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '33',
      name: null,
      source: '22',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '34',
      name: null,
      source: '22',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '35',
      name: null,
      source: '22',
      target: '18',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '36',
      name: null,
      source: '22',
      target: '19',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '37',
      name: null,
      source: '22',
      target: '20',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '38',
      name: null,
      source: '22',
      target: '21',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '47',
      name: null,
      source: '23',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '46',
      name: null,
      source: '23',
      target: '12',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '39',
      name: null,
      source: '23',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '40',
      name: null,
      source: '23',
      target: '17',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '41',
      name: null,
      source: '23',
      target: '18',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '42',
      name: null,
      source: '23',
      target: '19',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '43',
      name: null,
      source: '23',
      target: '20',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '44',
      name: null,
      source: '23',
      target: '21',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '45',
      name: null,
      source: '23',
      target: '22',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '24',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '48',
      name: null,
      source: '24',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '52',
      name: null,
      source: '25',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '51',
      name: null,
      source: '25',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '50',
      name: null,
      source: '25',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '26',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '26',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '53',
      name: null,
      source: '26',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '56',
      name: null,
      source: '26',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '57',
      name: null,
      source: '27',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '58',
      name: null,
      source: '27',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '27',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '59',
      name: null,
      source: '27',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '61',
      name: null,
      source: '27',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '62',
      name: null,
      source: '28',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '63',
      name: null,
      source: '28',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '66',
      name: null,
      source: '29',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '64',
      name: null,
      source: '29',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '65',
      name: null,
      source: '29',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '67',
      name: null,
      source: '30',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '31',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '31',
      target: '23',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '31',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '68',
      name: null,
      source: '31',
      target: '30',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '72',
      name: null,
      source: '32',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '73',
      name: null,
      source: '33',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '74',
      name: null,
      source: '33',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '75',
      name: null,
      source: '34',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '76',
      name: null,
      source: '34',
      target: '29',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '77',
      name: null,
      source: '35',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '35',
      target: '29',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '78',
      name: null,
      source: '35',
      target: '34',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '82',
      name: null,
      source: '36',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '83',
      name: null,
      source: '36',
      target: '29',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '80',
      name: null,
      source: '36',
      target: '34',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '81',
      name: null,
      source: '36',
      target: '35',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '87',
      name: null,
      source: '37',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '88',
      name: null,
      source: '37',
      target: '29',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '84',
      name: null,
      source: '37',
      target: '34',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '85',
      name: null,
      source: '37',
      target: '35',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '86',
      name: null,
      source: '37',
      target: '36',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '93',
      name: null,
      source: '38',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '94',
      name: null,
      source: '38',
      target: '29',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '89',
      name: null,
      source: '38',
      target: '34',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '90',
      name: null,
      source: '38',
      target: '35',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '91',
      name: null,
      source: '38',
      target: '36',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '92',
      name: null,
      source: '38',
      target: '37',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '95',
      name: null,
      source: '39',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '96',
      name: null,
      source: '40',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '97',
      name: null,
      source: '41',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '98',
      name: null,
      source: '41',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '101',
      name: null,
      source: '42',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '100',
      name: null,
      source: '42',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '99',
      name: null,
      source: '42',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '102',
      name: null,
      source: '43',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '103',
      name: null,
      source: '43',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '104',
      name: null,
      source: '43',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '44',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '105',
      name: null,
      source: '44',
      target: '28',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '107',
      name: null,
      source: '45',
      target: '28',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '108',
      name: null,
      source: '47',
      target: '46',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '112',
      name: null,
      source: '48',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '110',
      name: null,
      source: '48',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '111',
      name: null,
      source: '48',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '109',
      name: null,
      source: '48',
      target: '47',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '49',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '113',
      name: null,
      source: '49',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '50',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '115',
      name: null,
      source: '50',
      target: '49',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '119',
      name: null,
      source: '51',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '118',
      name: null,
      source: '51',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '117',
      name: null,
      source: '51',
      target: '49',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '52',
      target: '39',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '120',
      name: null,
      source: '52',
      target: '51',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '122',
      name: null,
      source: '53',
      target: '51',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '125',
      name: null,
      source: '54',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '124',
      name: null,
      source: '54',
      target: '49',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '123',
      name: null,
      source: '54',
      target: '51',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '131',
      name: null,
      source: '55',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '132',
      name: null,
      source: '55',
      target: '16',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '133',
      name: null,
      source: '55',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '55',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '128',
      name: null,
      source: '55',
      target: '39',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '134',
      name: null,
      source: '55',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '135',
      name: null,
      source: '55',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '127',
      name: null,
      source: '55',
      target: '49',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '126',
      name: null,
      source: '55',
      target: '51',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '129',
      name: null,
      source: '55',
      target: '54',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '136',
      name: null,
      source: '56',
      target: '49',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '137',
      name: null,
      source: '56',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '57',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '57',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '138',
      name: null,
      source: '57',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '145',
      name: null,
      source: '58',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '58',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '142',
      name: null,
      source: '58',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '141',
      name: null,
      source: '58',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '144',
      name: null,
      source: '58',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '148',
      name: null,
      source: '59',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '147',
      name: null,
      source: '59',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '59',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '146',
      name: null,
      source: '59',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '150',
      name: null,
      source: '60',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '151',
      name: null,
      source: '60',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '152',
      name: null,
      source: '60',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '153',
      name: null,
      source: '61',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '158',
      name: null,
      source: '61',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '157',
      name: null,
      source: '61',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '154',
      name: null,
      source: '61',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '156',
      name: null,
      source: '61',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '155',
      name: null,
      source: '61',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '164',
      name: null,
      source: '62',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '162',
      name: null,
      source: '62',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '159',
      name: null,
      source: '62',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '62',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '160',
      name: null,
      source: '62',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '161',
      name: null,
      source: '62',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '62',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '165',
      name: null,
      source: '62',
      target: '61',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '63',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '174',
      name: null,
      source: '63',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '63',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '63',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '167',
      name: null,
      source: '63',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '63',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '172',
      name: null,
      source: '63',
      target: '61',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '169',
      name: null,
      source: '63',
      target: '62',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '184',
      name: null,
      source: '64',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '64',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '175',
      name: null,
      source: '64',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '183',
      name: null,
      source: '64',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '179',
      name: null,
      source: '64',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '182',
      name: null,
      source: '64',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '181',
      name: null,
      source: '64',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '180',
      name: null,
      source: '64',
      target: '61',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '176',
      name: null,
      source: '64',
      target: '62',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '178',
      name: null,
      source: '64',
      target: '63',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '187',
      name: null,
      source: '65',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '194',
      name: null,
      source: '65',
      target: '55',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '193',
      name: null,
      source: '65',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '65',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '192',
      name: null,
      source: '65',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '65',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '190',
      name: null,
      source: '65',
      target: '61',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '188',
      name: null,
      source: '65',
      target: '62',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '185',
      name: null,
      source: '65',
      target: '63',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '186',
      name: null,
      source: '65',
      target: '64',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '200',
      name: null,
      source: '66',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '196',
      name: null,
      source: '66',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '197',
      name: null,
      source: '66',
      target: '59',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '203',
      name: null,
      source: '66',
      target: '60',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '202',
      name: null,
      source: '66',
      target: '61',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '198',
      name: null,
      source: '66',
      target: '62',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '201',
      name: null,
      source: '66',
      target: '63',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '195',
      name: null,
      source: '66',
      target: '64',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '199',
      name: null,
      source: '66',
      target: '65',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '204',
      name: null,
      source: '67',
      target: '57',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '68',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '68',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '205',
      name: null,
      source: '68',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '208',
      name: null,
      source: '68',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '68',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '209',
      name: null,
      source: '68',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '213',
      name: null,
      source: '69',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '214',
      name: null,
      source: '69',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '211',
      name: null,
      source: '69',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '69',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '217',
      name: null,
      source: '69',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '216',
      name: null,
      source: '69',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '212',
      name: null,
      source: '69',
      target: '68',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '221',
      name: null,
      source: '70',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '222',
      name: null,
      source: '70',
      target: '24',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '218',
      name: null,
      source: '70',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '223',
      name: null,
      source: '70',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '224',
      name: null,
      source: '70',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '225',
      name: null,
      source: '70',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '220',
      name: null,
      source: '70',
      target: '68',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '219',
      name: null,
      source: '70',
      target: '69',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '230',
      name: null,
      source: '71',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '233',
      name: null,
      source: '71',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '226',
      name: null,
      source: '71',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '232',
      name: null,
      source: '71',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '71',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '228',
      name: null,
      source: '71',
      target: '68',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '227',
      name: null,
      source: '71',
      target: '69',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '229',
      name: null,
      source: '71',
      target: '70',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '236',
      name: null,
      source: '72',
      target: '11',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '234',
      name: null,
      source: '72',
      target: '26',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '235',
      name: null,
      source: '72',
      target: '27',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '237',
      name: null,
      source: '73',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '238',
      name: null,
      source: '74',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '239',
      name: null,
      source: '74',
      target: '73',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '242',
      name: null,
      source: '75',
      target: '25',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '244',
      name: null,
      source: '75',
      target: '41',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: null,
      name: null,
      source: '75',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '241',
      name: null,
      source: '75',
      target: '68',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '240',
      name: null,
      source: '75',
      target: '69',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '245',
      name: null,
      source: '75',
      target: '70',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '246',
      name: null,
      source: '75',
      target: '71',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '252',
      name: null,
      source: '76',
      target: '48',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '253',
      name: null,
      source: '76',
      target: '58',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '251',
      name: null,
      source: '76',
      target: '62',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '250',
      name: null,
      source: '76',
      target: '63',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '247',
      name: null,
      source: '76',
      target: '64',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '248',
      name: null,
      source: '76',
      target: '65',
      lineStyle: {
        normal: {}
      }
    },
    {
      id: '249',
      name: null,
      source: '76',
      target: '66',
      lineStyle: {
        normal: {}
      }
    }
  ]
};
const categories = [];
for (let i = 0; i < 9; i++) {
  categories[i] = {
    name: 'category' + i
  };
}
data.nodes.forEach(function(node) {
  node.itemStyle = null;
  node.symbolSize = 10;
  node.value = node.symbolSize;
  node.category = node.attributes.modularity_class;
  // Use random x, y
  node.x = node.y = null;
  node.draggable = true;
});
const options = {
  title: {
    text: 'Les Miserables',
    subtext: 'Default layout',
    top: 'bottom',
    left: 'right'
  },
  tooltip: {},
  legend: [
    {
      // selectedMode: 'single',
      data: categories.map(function(a) {
        return a.name;
      })
    }
  ],
  animation: false,
  series: [
    {
      name: 'Les Miserables',
      type: 'graph',
      layout: 'force',
      data: data.nodes,
      links: data.links,
      categories,
      roam: true,
      label: {
        position: 'right'
      },
      force: {
        repulsion: 100,
        layoutAnimation: false // 服务端渲染时取消动画
      }
    }
  ]
};

function generateImage(options) {
  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext('2d');
  ctx.font = '12px ';
  echarts.setCanvasCreator(() => canvas);
  const chart = echarts.init(canvas);
  options.animation = false;
  options.textStyle = {
    fontSize: 12
  };
  chart.setOption(options);
  try {
    // fs.writeFileSync(savePath, )
    return chart.getDom().toBuffer();
    // console.log('Create Img:' + savePath)
  } catch (err) {
    console.error('Error: Write File failed' + err.message);
  }
}

router.get('/chart', async (_, res) => {
  const image = await generateImage(
    options,
    path.join(__dirname, '../../static/foo.jpg')
  );
  // console.log(image)
  res.send(image);
});

module.exports = router;
