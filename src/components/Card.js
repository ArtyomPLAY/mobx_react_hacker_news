import React from 'react';
import Button from './Button/';

const TEXT_COLOR = getComputedStyle(document.documentElement).getPropertyValue(
  '--text'
);

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  onHover = () => {
    this.setState({ hovered: true });
  };

  render() {
    const { story } = this.props;

    return (
      <div className="card" onMouseEnter={this.onHover}>
        <div className="card--title">
          <p href="/" className="author">
            @{story.by}
          </p>
          <Button
            icon="more_vert"
            color={TEXT_COLOR}
            iconSize="22px"
            padding="1px"
          />
        </div>
        <div>
          <a href={story.url}>{story.title}</a>
        </div>
      </div>
    );
  }
}

export default Card;
