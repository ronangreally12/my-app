import { render, screen } from '@testing-library/react';
import App from './App';
import CardItem from './components/CardItem';
import AnimalList from './components/CardItem';

import { testData } from './testdata';
const anItem = testData.data[0];

//card item
test('CardItem should render correctly when passed no data', () => {
  render(<CardItem />);
  const element = screen.getByText(/Empty Card/i);
  expect(element).toBeInTheDocument();
});
test('CardItem should render correctly when passed an item', () => {
  render(<CardItem item={anItem} />);
  const titleElement = screen.getByText(/Sad Puss In Boots GIF by PeacockTV/i);
  expect(titleElement).toBeInTheDocument();
});

//Animal List
test('Animal List render correctly when passed no data', () => {
  render(<AnimalList />);
});
test('Animal List render correctly when passed an list of items', () => {
  render(<AnimalList animals={testData.data} />);
});


//App
test('App should render correct', () => {
  render(<App />);
});
