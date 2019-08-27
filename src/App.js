import React from 'react';
import './App.css';
import { Loading, Card, Button } from './components/';
import { observer } from 'mobx-react';

const textColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--text'
);

class App extends React.Component {
  componentDidMount() {
    this.props.store.loadIds();
  }

  render() {
    const { store } = this.props;
    const { loading, stories } = store;

    const WithLoading = Component => ({ loading, ...rest }) =>
      loading ? <Loading /> : <Component {...rest} />;

    const StoriesComponent = () => (
      <div className="cards">
        {stories.map(story => (
          <Card story={story} key={story.id} />
        ))}
        <div
          className="card card-load-more"
          onClick={() => store.fetchStories()}
        >
          <Button icon="add" padding="7px" color={textColor} />
        </div>
      </div>
    );

    const StoriesComponentWithLoading = WithLoading(StoriesComponent);

    return (
      <div>
        <h1>Hacker news</h1>
        <StoriesComponentWithLoading loading={loading} />
      </div>
    );
  }
}

App = observer(App);

export default App;
