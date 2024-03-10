# Practice Project: Quiz App

1. [Add Project (Boilerplate)](https://github.com/Aman0509/learningReact/pull/11/commits/22f27d9796b16bc2c16be0e975f48b27f54b935a)
2. [Add Components & States](https://github.com/Aman0509/learningReact/pull/11/commits/f911a06dee59f31dbc371cfe532616aff16c9d4c)
3. [Derive Values, Output Questions & Register Answers](https://github.com/Aman0509/learningReact/pull/11/commits/98f6c723aad70e903981406745217b599bfd8519)
4. [Shuffle Answers & Add Quiz Logic](https://github.com/Aman0509/learningReact/pull/11/commits/038a02373b135f3b38c39a3ca3ecc43563c75ef6)
5. [Add Question Timers](https://github.com/Aman0509/learningReact/pull/11/commits/5303d480c06ae9452526ff3b1ccae3d7cbc4947d)
6. [Highlight Selected Answers & Manage More State](https://github.com/Aman0509/learningReact/pull/11/commits/d1f3a343b04f6caa60219de91ce7a1fe6698ec85)
7. [Move State Down](https://github.com/Aman0509/learningReact/pull/11/commits/d9d4b96af76f51dfcc95ea0fe814cfa6e42afa73)
8. [Set Different Timers based on the Selected Answer](https://github.com/Aman0509/learningReact/pull/11/commits/c2105b262a2a61dba5127d01e9109c4f7e7ae790)
9. [Output Quiz Results](https://github.com/Aman0509/learningReact/pull/11/commits/961e521a15d3d9d8e6582ebadaec2f83a0ea9a0d)

## `key` and its significance in Listing in ReactJS

In React, keys are unique identifiers that help React identify which items in a list have changed, added, or removed. Keys are used to improve the performance of React applications by helping React to efficiently update the DOM.

Keys are passed to React elements as a prop. The key prop can be any valid string value, but it is recommended to use a string that uniquely identifies the element. For example, if you are rendering a list of users, you could use the user's ID as the key.

Here is an example of how to use keys in React:

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
];

const userList = users.map((user) => <li key={user.id}>{user.name}</li>);
```

In this example, the key prop is set to the user's ID. This helps React to identify which users have changed, added, or removed when the list is updated.

Keys are especially important when rendering large lists. By using keys, React can efficiently update the DOM without having to re-render the entire list. This can lead to significant performance improvements.

Here are some tips for using keys in React:

- Use a unique string value for each key.
- Avoid using indexes as keys. Indexes can change when items are added or removed from a list.
- Use a stable identifier for each key. A stable identifier is an identifier that does not change over time. For example, a user's ID is a stable identifier, but a user's name is not.

Readings:

- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [What are keys and its significance in Listing in React JS ?](https://www.geeksforgeeks.org/what-are-keys-and-its-significance-in-listing-in-reactjs/)
- [The Importance of Using the `key` Prop in a List of Elements in React.js](https://codedamn.com/news/reactjs/key-prop-list-of-elements)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Handling Side Effects & Working with `useEffect()` Hook](../010-handling-side-effects/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
