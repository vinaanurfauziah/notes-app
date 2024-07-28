import React from 'react';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { searchNotes } from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get('title');

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  return <SearchPage onSearch={changeSearchParams} activeKeyword={title} />;
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundNotes: props.activeKeyword ? searchNotes(props.activeKeyword) : [],
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(keyword) {
    this.setState(() => {
      return {
        foundNotes: searchNotes(keyword),
      };
    });

    this.props.onSearch(keyword);
  }

  render() {
    return (
      <section className='search-page'>
        <h2>Search Note</h2>
        <SearchBar
          search={this.onSearch}
          defaultKeyword={this.props.activeKeyword}
          className='search-bar'
        />
        <div className='note-list'>
          <NoteList notes={this.state.foundNotes} />
        </div>
      </section>
    );
  }
}

SearchPage.propTypes = {
  activeKeyword: PropTypes.any,
  onSearch: PropTypes.func
}

export default SearchPageWrapper;
