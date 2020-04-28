import renderer from 'react-test-renderer';
import LabelSelect from '../LabelSelect';
import mock from './__mock__/mock';

let selectedItems = mock.selectedList;

let otherItems = mock.list;

// snapshot test

it('renders enabled LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      title="Test1"
      onConfirm={() => {}}
      selectedOptions={selectedItems}
      options={otherItems}>
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders readOnly LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      readOnly={true}
      title="Test2"
      onConfirm={() => {}}
      selectedOptions={selectedItems}
      options={otherItems}>
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders disabled LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      enable={false}
      title="Test3"
      onConfirm={() => {}}
      selectedOptions={selectedItems}
      options={otherItems}>
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('interact with modal', () => {
  let arr = [];
  const item = mock.list[0];
  const tree = shallow(
    <LabelSelect
      title="Enzyme Test"
      onConfirm={(list) => {arr = list;}}
      selectedOptions={selectedItems}
      options={otherItems}>
    </LabelSelect>
  );
  let select = tree.instance();
  expect(tree.find('TouchableHighlight').length).toEqual(4);
  select.openModal();
  expect(tree.state('isModalVisible')).toEqual(true);
  select.toggleSelect(item);
  select.confirmSelect();
  expect(arr[0]).toEqual(item);
  expect(tree.state('isModalVisible')).toEqual(false);
  select.openModal();
  expect(tree.state('isModalVisible')).toEqual(true);
  select.cancelSelect();
  expect(tree.state('isModalVisible')).toEqual(false);
  select.confirmSelect();
});
