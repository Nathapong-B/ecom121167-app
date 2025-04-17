import { useEffect, useState } from "react";
import { useAuthStore } from "../../../ecomStore/authStore"
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import BtnMotionSlice from "../../util/btnMotion";
import LoadingCover from "../../loadingCover";

export default function ListUsers(props) {
    const { showActive } = props;
    const { token, callListUsers, changeStatus, usersactive, usersinactive, actionClearUsers } = useAuthStore(
        useShallow(s => ({
            token: s.token,
            callListUsers: s.actionListUsers,
            changeStatus: s.actionChangeStatusUser,
            usersactive: s.usersactive,
            usersinactive: s.usersinactive,
            actionClearUsers: s.actionClearUsers
        }))
    );
    const [dataListUser, setDataLIstUser] = useState([]);
    const [isLoadingCoverPage, setIsLoadingCoverPage] = useState(false);

    // email, role, status, first_name, last_name, address, phone, profile_image, last_update, create_date,

    const hdlCallListUsers = async (status) => {
        if (status === 'active') {
            if (!usersactive) {
                const res = await callListUsers(status, 20, token);
                if (res.error) {
                    toast.error(res.error.message)
                    console.log(res)
                };
            } else {
                return setDataLIstUser(usersactive ?? []);
            };
        };

        if (status === 'inactive') {
            if (!usersinactive) {
                const res = await callListUsers(status, 20, token);
                if (res.error) {
                    toast.error(res.error.message)
                    console.log(res)
                };
            } else {
                return setDataLIstUser(usersinactive ?? []);
            };
        };
    };

    const hdlChangeStatus = async (item) => {
        const { id, status } = item;

        // alert confirm change status
        const eventClick = await Swal.fire({
            title: 'Confirm change status user ?',
            html: `<div class='text-start'>E-mail : ${item.email}</div>
            <div class='text-start'>Role : ${item.role}</div>
            <div class='text-start'>Full name : ${item.first_name} ${item.last_name}</div>`,
            icon: 'question',
            showCancelButton: true,
        });

        if (eventClick.isConfirmed) {
            setIsLoadingCoverPage(true);
            const res = await changeStatus(id, status, token);

            if (res.status === 200) {
                hdlCallListUsers(status);
                toast.success(res.data.message);
            } else if (res.error) {
                toast.error(res.error.message);
                console.log(res)
            }

            setIsLoadingCoverPage(false);
        };

    };

    const hdlUserInfo = (item) => {
        props.userInfo(item)
    };

    useEffect(() => {
        if (showActive) {
            hdlCallListUsers('active');
        } else {
            hdlCallListUsers('inactive');
        };

        window.addEventListener('beforeunload', actionClearUsers)
    }, [showActive, usersactive, usersinactive]);

    return (
        <div>
            <LoadingCover title={'Processing please wait.'} isLoading={isLoadingCoverPage} />

            <div>
                <table className="bo-tb">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataListUser.length > 0
                            ? dataListUser.map((e, i) => (
                                <tr key={i}>
                                    <td className="ps-2">{e.email}</td>
                                    <td className="ps-2">{e.role}</td>
                                    <td className="ps-2">{e.first_name ?? ''} {e.last_name ?? ''}</td>
                                    <td className="text-center">
                                        {/* <button className={e.status === 'active' ? "bo-btn-add bg-green-500" : "bo-btn-add bg-gray-500"} onClick={() => hdlChangeStatus(e)}>{e.status}</button> */}

                                        <BtnMotionSlice index={i} data={e} start={'right-[100%]'} stop={'right-[15%]'} btnmain={e.status === 'active' ? 'Active' : 'Inactive'} btnsecond={e.status === 'active' ? 'Inactive' : 'Active'} colmain={e.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} colsecond={e.status === 'active' ? 'bg-gray-500' : 'bg-green-500'} returndata={hdlChangeStatus} />
                                    </td>
                                    <td className="text-center">
                                        <button className="bo-btn-add bg-sky-500" onClick={() => hdlUserInfo(e)}>Info</button>
                                    </td>
                                </tr>
                            ))
                            : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
};