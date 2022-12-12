import * as StudentActionCreators from './student.action-creator';
import * as GroupActionCreators from './group.action-creator';
import * as StatusActionCreators from './status.action-creator';
import * as DirectionActionCreators from './direction.action-creator';

export default {
  ...StudentActionCreators,
  ...GroupActionCreators,
  ...StatusActionCreators,
  ...DirectionActionCreators,
}