import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
<<<<<<< HEAD
import { deleteNote, getNotes } from '../utils/local-data';
import PropTypes from 'prop-types';
=======
import { getNotes, deleteNote } from '../utils/api';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
>>>>>>> abdc32465860646d24aeae44de87b528b2646916

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    // update the note state from data.js
    const { data } = await getNotes();
    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

<<<<<<< HEAD
  onAddNoteHandler = ({title, body}) => {
        this.setState(prevState => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: new Date().toLocaleDateString(),
                        archived: false,
                    },
                ],
            }
        })
    }
=======
  onAddNoteHandler = ({ title, body }) => {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toLocaleDateString(),
            archived: false,
          },
        ],
      };
    });
  };
>>>>>>> abdc32465860646d24aeae44de87b528b2646916

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section>
                <h2>{locale === 'id' ? 'Daftar Catatan' : 'Notes List'}</h2>
              <NoteList notes={notes} onDelete={this.onDeleteHandler} />
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
<<<<<<< HEAD
  keywordChange: PropTypes.func
}
=======
  keywordChange: PropTypes.func,
};
>>>>>>> abdc32465860646d24aeae44de87b528b2646916

export default HomePageWrapper;
