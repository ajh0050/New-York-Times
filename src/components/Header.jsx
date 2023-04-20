import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';


const Header = () => {
    // const router = useRouter();
    // const onClick = () => {
    //     router.push('/');
    // }
    return (
        <div className="navbar bg-base-100 m-4">
            <Link href='/' className="btn btn-ghost normal-case text-3xl" >NYT</Link>
        </div>

    );
}

export default Header;