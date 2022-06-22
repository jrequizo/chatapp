import { useQuery } from 'react-query';

import Navbar from '../../components/navbar/Navbar'
import { getProfileData } from './Profile.controller';

import './Profile.css';

interface ProfileData {
  uid: string
  username: string
  pfp_url: string
  about: string
}

function Profile() {

  const uid = window.location.pathname.split('/').pop() ?? ""

  const { data, status } = useQuery<ProfileData, Error>(['user-profile', uid], () => {
      return getProfileData(uid ?? "")
    },
  )
  function handleOnClick() {
    console.log()

    async function doHandleOnClick() {
      console.log('test')
    }

    doHandleOnClick()
  }

  if (status === 'loading') {
    return (
      <main>
        <Navbar />
        <div className="loading"><span className="loading-text">Loading...</span></div>
      </main>
    )
  }

  return (
    <main className='main'>
      <Navbar />
      <section className="profileContainer">
        <h2 className='profileName'>{data?.username}</h2>

        <div className="profile-picture-bio-container">
          <div className="profile-left-area">

            <div className="pfp-div">
              <img className="profile-pfp" src={data?.pfp_url} alt="Profile"></img>

              <button className='changePicBtn btn' onClick={handleOnClick}>Change picture</button>
            </div>
          </div>
          <div className="profile-right-area">
            <div className="bioContainer">
              <h3 className="aboutme">About Me</h3>
              <button className="editBioBtn" onClick={handleOnClick}>Edit</button>
            </div>
            <p className='bioText'>
              {data?.about}
            </p>
          </div>
        </div>


        {
          (true
            &&
            <div className='friends-list-container'>
              <h3>Friends list</h3>
              <ul>
                <li>Friend 1</li>
                <li>Friend 2</li>
                <li>Friend 3</li>
              </ul>
            </div>
          )
        }
      </section>

    </main>

  );
}

export default Profile;
