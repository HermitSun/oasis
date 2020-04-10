// 论文的sort key只有3个，因为不存在相关度的概念
const paperSortKeyOptions = [
  {
    value: 'recent',
    label: 'recent'
  },
  {
    value: 'early',
    label: 'early'
  },
  {
    value: 'citation',
    label: 'citation'
  }
];
export default paperSortKeyOptions;
