import userService from "../../service/UserService";

function MembershipManagement() {

    const onRefreshToken = () => {
        // userService.getUser
    }

    return (
        <div>
            This is Membership
            <button onClick={onRefreshToken}>Refresh token</button>
        </div>
    )
}

export default MembershipManagement;