const Transition = ({ history, location }, ...props) => {
  //location.pathname != '/settings' && history.push('/settings');
  location.pathname != props.path && history.push(props.path);
  return null;
}

export default Transition;