import shallowEqual from 'shallowequal';

export function virtualRowsAreEqual(prevProps, nextProps) {
  const {
    style: prevStyle,
    data: prevData,
    index: prevIndex,
    ...prevRest
  } = prevProps;
  const {
    style: nextStyle,
    data: nextData,
    index: nextIndex,
    ...nextRest
  } = nextProps;

  const { data: nextItemData, ...restNextItemData } = nextData;
  const { data: prevItemData, ...restPrevItemData } = prevData;

  return (
    nextIndex === prevIndex &&
    shallowEqual(prevStyle, nextStyle) &&
    shallowEqual(prevItemData[prevIndex], nextItemData[nextIndex]) &&
    shallowEqual(restPrevItemData, restNextItemData) &&
    shallowEqual(prevRest, nextRest)
  );
}
