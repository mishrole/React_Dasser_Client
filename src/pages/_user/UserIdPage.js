import React from "react";
import { Link } from "react-router-dom";
import { HeaderNav } from "../../components/header/HeaderNav";
import { UserEditForm } from "../../components/user/UserEditForm";

export const UserIdPage = (param) => {

    // console.log(param.match.params.userId)

    return (
        <>
            <HeaderNav></HeaderNav>
            <Link className="nav-link" to={`/user`}>Return to List</Link>
            

            <br />

            <UserEditForm userId = { param.match.params.userId }></UserEditForm>

        </>
    )
}