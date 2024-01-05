// import { auth, signOut } from '@/auth';

// const SettingsPage = async () => {
//   const session = await auth();

//   return (
//     <div>
//       {JSON.stringify(session)}

//       <form
//         action={async () => {
//           'use server';
//           await signOut();
//         }}
//       >
//         <button type="submit">Sign Out</button>
//       </form>
//     </div>
//   );
// };

// export default SettingsPage;

// use client
'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    // signOut();

    //  or
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
