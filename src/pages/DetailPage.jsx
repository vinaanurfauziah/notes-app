import React from 'react';
import { useParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';
import { getNotes } from '../utils/local-data';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={Number(id)} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNotes(props.id),
    };
  }

  render() {
    if (this.state.note === null) {
      return <p>Note is not found!</p>;
    }

    return (
      <section>
        <NoteDetail {...this.state.note} />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.number.isRequired,
}

export default DetailPageWrapper;
