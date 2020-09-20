// react does not allow rendering batches of elements
// this class is to wrap elements, to render batch of elements without compile error
const Wrap = (props) => props.children;
export default Wrap;