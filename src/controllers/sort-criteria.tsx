import {
  SortCriterion,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  buildFieldSortCriterion,
  buildNoSortCriterion,
  SortOrder,
} from '@coveo/headless';

export const criteria: [string, SortCriterion][] = [
  ['Relevance', buildRelevanceSortCriterion()],
  ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
  ['Date (Descending)', buildDateSortCriterion(SortOrder.Descending)],
  ['Size (Ascending)', buildFieldSortCriterion('size', SortOrder.Ascending)],
  ['Random', buildNoSortCriterion()],
  ['Size (Descending)', buildFieldSortCriterion('size', SortOrder.Descending)],
 ];