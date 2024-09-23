import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => {
  return (
    <div className='auth-page'>
        <UserProfile />;
    </div>
    );
};

export default UserProfilePage;