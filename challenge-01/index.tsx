interface IUser {
  username: string
  status: "online" | "offline" | "away"
  lastActivity: number
}

const users: IUser[] = [
  {
    username: 'David',
    status: 'online',
    lastActivity: 10
  },
  {
    username: 'Lucy',
    status: 'offline',
    lastActivity: 22
  },
  {
    username: 'Bob',
    status: 'online',
    lastActivity: 104
  }, 
  {
    username: 'Feline',
    status: 'online',
    lastActivity: 8
  },
  {
    username: 'Klaus',
    status: 'offline',
    lastActivity: 300
  }
  ]


function whoIsOnline (users: IUser[]) {
  
    const onlineUsers = users.filter((user) => user.status === "online" && user.lastActivity <= 10).map((user) => user.username);
    // console.log(onlineUsers);

    const offlineUsers = users.filter((user) => user.status === "offline").map((user) => user.username);
    // console.log(offlineUsers);

    const awayUsers = users.filter((user) => user.status === "away" || (user.status === "online" && user.lastActivity > 10)).map((user) => user.username);
    // console.log(awayUsers);

    return {online: onlineUsers, offline: offlineUsers, away: awayUsers}
}

console.log(whoIsOnline(users));


/* output IST
[
  {
    username: "David",
    status: "online",
    lastActivity: 10,
  }
]
[
  {
    username: "Lucy",
    status: "offline",
    lastActivity: 22,
  }
]
[
  {
    username: "Bob",
    status: "online",
    lastActivity: 104,
  }
]

 output SOLL
{
  online: [
    'David'
  ],
  offline: [
    'Lucy'
  ],
  away: [
    'Bob'
  ]
}
  */