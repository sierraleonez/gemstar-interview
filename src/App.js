import { useState } from 'react'
import "./App.css";
import { THEME } from "./theme";
import { BurgerIcon, LogoutIcon, SearchIcon, LOGO, DashboardMenuIcon, ApprovalMenuIcon, MyClientIcon, EditProfileIcon } from "./icon/index";
import { useTable } from "react-table";

const dummyClientList = [
  {
    logo: LOGO.dbs,
    name: "DBS Bank",
    desc: "DBS Bank Limited is a Singaporean multinational banking and financial services corporation headquartered at the Marina Bay Financial Centre in the Marina Bay district of Singapore.",
  },
  {
    logo: LOGO.proudfoot,
    name: "Proudfoot",
    desc: "Proudfoot engages teams and leadership, at all levels, to create innovative solutions to operational constraints and solve the people challenge associated with making sure that change takes place.",
  },
  {
    logo: LOGO.rmi,
    name: "RMI",
    desc: "RMI is a trusted global verification partner for Asia-Pacific organisations, offering a highly personalised and comprehensive background screening service.",
  },
];

const COLUMNS = [
  {
    Header: "Clients",
    accessor: "logo",
    Cell: (props) => {
      return <img src={props.cell.value} />;
    },
  },
  {
    Header: "Approval name",
    accessor: "name",
  },
  {
    Header: "Client contact",
    accessor: "contact",
    Cell: (props) => <UserAvatar user={props} />,
  },
  {
    Header: "Owner",
    accessor: "owner",
    Cell: (props) => <UserAvatar user={props} />,
  },
  {
    Header: "Date issued",
    accessor: "date",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (props) => <StatusConverter status={props.cell.value} />,
  },
];

const DUMMY_APPROVALS = [
  {
    logo: LOGO.dbs_mini,
    name: "DBS DEG renewal energy LinkedIn post tiles... ",
    contact: "Jasmine",
    owner: "Radhika",
    date: "January 23, 2022",
    status: 0,
  },
  {
    logo: LOGO.proudfoot_mini,
    name: "PF website mining and metals edit",
    contact: "Lorena",
    owner: "Radhika",
    date: "January 23, 2022",
    status: 1,
  },
  {
    logo: LOGO.rmi_mini,
    name: "RMI January newletter EDM",
    contact: "Mervyn",
    owner: "Radhika",
    date: "January 23, 2022",
    status: 2,
  },
];

const SIDEBAR_MENU = [
  {
    title: "Navigation",
    isSub: false,
    icon: "",
    submenu: [
      {
        title: "Dashboard",
        isSub: true,
        icon: DashboardMenuIcon,
        submenu: [],
      },
      {
        title: "Approvals",
        isSub: true,
        icon: ApprovalMenuIcon,
        submenu: [],
      },
    ],
  },
  {
    title: "My Account",
    isSub: false,
    icon: "",
    submenu: [
      {
        title: "My clients",
        isSub: true,
        icon: MyClientIcon,
        submenu: [],
      },
      {
        title: "Edit profiles",
        isSub: true,
        icon: EditProfileIcon,
        submenu: [],
      },
    ],
  },
];

function App() {
  const [currentMenu, setCurrentMenu] = useState('Dashboard')
  return (
    <div className="main">
      <SideBar currentMenu={currentMenu}/>
      <MainContent />
    </div>
  );
}

function SideBar({ currentMenu }) {
  console.log("from sidebar", currentMenu)
  return (
    <div
      className="sideBar"
      style={{ backgroundColor: THEME.color.primaryBlue }}
    >
      <div className="logoContainer">LOGO</div>
      <div className="content" style={{ padding: "3rem 2rem" }}>
        <div className="userProfile">
          <div
            className="profilePicture"
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: 100,
              backgroundColor: THEME.color.grey,
            }}
          />
          <p>Randhika Dhawan Puri</p>
          <p>Senior Client Services</p>
        </div>
        <MenuNavigation menus={SIDEBAR_MENU} currentMenu={currentMenu} />
      </div>
    </div>
  );
}

function MenuNavigation({ menus, currentMenu }) {
  console.log(currentMenu)
  return (
    <>
      {menus.map((menu) => (
        <div key={menu.title}>
          {!menu.isSub && <div className="divider" />}
          <div style={{ display: "flex", alignItems: 'center' }}>
            {menu.icon && <img src={menu.icon} style={{ marginRight: '0.5rem' }}/>}
            <p style={{ color: currentMenu === menu.title ? THEME.color.primaryBlue : THEME.color.white }}>{menu.title}</p>
          </div>
          {menu.submenu && <MenuNavigation menus={menu.submenu} />}
        </div>
      ))}
    </>
  );
}

function MainContent() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: COLUMNS, data: DUMMY_APPROVALS });
  return (
    <div style={{ padding: "1rem 2rem", width: "70%" }}>
      <div className="topBar" style={{ display: "flex", alignItems: "center" }}>
        <div className="searchBar" style={{ flex: 3 }}>
          <div
            style={{
              border: "1px solid black",
              width: "40%",
              borderRadius: 25,
              padding: "0.6rem 1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={SearchIcon} />
            <input
              style={{ border: "none" }}
              placeholder="Input anything here"
            />
          </div>
        </div>

        <div
          className="menu"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="logout"
            style={{ display: "flex", alignItems: "center", color: "#EE0D0D" }}
          >
            <img src={LogoutIcon} />
            <p>Logout</p>
          </div>
          <div
            className="burger"
            style={{ alignItems: "center", display: "flex" }}
          >
            <img src={BurgerIcon} />
          </div>
        </div>
      </div>
      <div className="content">
        <p style={{ fontSize: 24, fontWeight: "bold", color: "#323A46" }}>
          Hi Radhika, welcome back!
        </p>

        <div className="clientListContainer">
          <p style={{ fontSize: 20, fontWeight: "bold", marginBlockEnd: 0 }}>
            Your client list
          </p>
          <p>You currently servicing 3 clients</p>
          <div className="clientList" style={{ display: "flex" }}>
            {dummyClientList.map((client) => (
              <div
                key={client.name}
                style={{
                  width: "18rem",
                  padding: "1rem 2rem",
                  marginRight: "1rem",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <img src={client.logo} width={100} height={30} />
                <p>{client.name}</p>
                <p>{client.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recentApproval">
          <div
            className="approvalHeader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
              <p
                style={{ fontSize: 20, fontWeight: "bold", marginBlockEnd: 4 }}
              >
                Recent approvals
              </p>
              <p style={{ marginBlockStart: 4 }}>
                You can find the recent on-going approvals here
              </p>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: THEME.color.secondaryBlue,
                  border: "none",
                  borderRadius: 25,
                  padding: "0.5rem 1.5rem",
                  color: THEME.color.white,
                }}
              >
                Create new approval
              </button>
            </div>
          </div>

          <div className="approvalTable">
            <table
              {...getTableProps()}
              style={{ width: "100%" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{
                        boxShadow: "0px 1px 2px 0px #888888",
                        borderRadius: 5,
                        marginTop: '2rem'
                      }}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{ padding: "0.5rem", textAlign: "center" }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusConverter({ status }) {
  switch (status) {
    case 0:
      return (
        <div
          style={{
            backgroundColor: "#FCE513",
            padding: "0.2rem 0.5rem",
            borderRadius: 10,
          }}
        >
          In progress
        </div>
      );
    case 1:
      return (
        <div
          style={{
            backgroundColor: "#F4B000",
            padding: "0.2rem 0.5rem",
            borderRadius: 10,
          }}
        >
          1st revision
        </div>
      );
    case 2:
      return (
        <div
          style={{
            backgroundColor: "#F47500",
            padding: "0.2rem 0.5rem",
            borderRadius: 10,
          }}
        >
          2nd revision
        </div>
      );
  }
}

function UserAvatar({ user }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "1.5rem",
          height: "1.5rem",
          color: THEME.color.white,
          backgroundColor: THEME.color.primaryBlue,
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "0.5rem",
        }}
      >
        {user.cell.value[0]}
      </div>
      {user.cell.value}
    </div>
  );
}
export default App;
