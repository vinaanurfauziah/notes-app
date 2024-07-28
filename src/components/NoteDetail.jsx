import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiArchiveIn } from 'react-icons/bi';

function NoteDetail({ title, createdAt, body }) {
  return (
    <div>
      <nav className='edit'>
        <ul>
          <li>
            <Link to='/edit'>
              <FiEdit />
            </Link>
          </li>
          <li>
            <Link to='/archived'>
              <BiArchiveIn />
            </Link>
          </li>
        </ul>
      </nav>
      <h2>{title}</h2>
      <p className='created-at'>Created At {createdAt}</p>
      <p className='note-body'>{body}</p>
    </div>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;
