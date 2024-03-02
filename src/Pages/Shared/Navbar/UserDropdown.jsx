import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
// import { CgProfile } from "react-icons/cg";
import useAdmin from '../../../hook/useAdmin';


const UserDropdown = ({photoURL,handleLogin}) => {

    const navigate = useNavigate()
    const [isAdmin] = useAdmin();

    const items = [
        // {
        //   label: <div className='flex gap-2 items-center '>
        //   <CgProfile></CgProfile>
        //   <Link to="https://www.aliyun.com">My Profile</Link>
        // </div>,
        //   key: '0',
        // },
        {
          label:  <div onClick={()=>navigate(`/dashboard/${ !isAdmin ? 'edit' : 'admin/admin-dashboard'}`)} className='flex gap-2 items-center '>
          <RxDashboard></RxDashboard>
          <p>Dashboard</p>
        </div>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <div onClick={handleLogin} className='flex gap-2 items-center'>
            <LogoutOutlined></LogoutOutlined>
            <button >Sign Out</button>
          </div>,
          key: '3',
        },
      ];

    return (
        <Dropdown menu={{items,}} trigger={['click']} arrow='true'>
            <a onClick={(e) => e.preventDefault()} className=' cursor-pointer'>
            <Space>
                <img loading="lazy" src={photoURL} className='w-16 h-16 rounded-full object-cover mt-1.5' alt="" />
            </Space>
            </a>
        </Dropdown>
    )}
export default UserDropdown;