import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import ArchivedPage from '../pages/ArchivedPage';
<<<<<<< HEAD
import FailedPage from '../pages/FailedPage' 

function NoteApp() {
  return (
    <div className="note-app">
      <header className='note-app__header'>
        <h1>Aplikasi Notes</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/*" element={<FailedPage />} />
        </Routes>
      </main>
    </div>
  );
=======
import FailedPage from '../pages/FailedPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';
import ToggleTheme from '../components/ToggleTheme';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LocaleProvider } from '../contexts/LocaleContext';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem('theme', newTheme);

          // mengembalikan state dengan nilai theme terbaru.
          return {
            theme: newTheme
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);

            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);

    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken('');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
        <div className='note-app'>
          <ToggleTheme />
          <header className='note-app__header'>
          <h1>{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
          </header>
          <main>
            <Routes>
              <Route
                path='/*'
                element={<LoginPage loginSuccess={this.onLoginSuccess} />}
              />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
      <ThemeProvider value={this.state}>
        <div className='note-app'>
          <header className='note-app__header'>
            <ToggleTheme />
            <h1>Aplikasi Notes</h1>
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/add' element={<AddPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/archived' element={<ArchivedPage />} />
              <Route path='/notes/:id' element={<DetailPage />} />
              <Route path='/*' element={<FailedPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </LocaleProvider>
    );
  }
>>>>>>> abdc32465860646d24aeae44de87b528b2646916
}

export default NoteApp;
