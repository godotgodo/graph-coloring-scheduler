const isSubjectUsed = (data = {}, givenSubjects = []) => {
  // givenSubjects = [
  //   {
  //     _id: "6585745e5c2d80dfc6dad49d",
  //     code: "test",
  //     startTime: 13,
  //     endTime: 15,
  //     day: 1,
  //     lecturer: "6584d508f9af1a1765355bc7",
  //     subject: "6584d779ac9577b3404abe3d",
  //     __v: 0,
  //     id: "6585745e5c2d80dfc6dad49d",
  //   },
  //   {
  //     _id: "658598bb3fe025183446eecc",
  //     code: "test",
  //     startTime: 9,
  //     endTime: 11,
  //     day: 2,
  //     lecturer: "6584d508f9af1a1765355bc7",
  //     subject: "6584d779ac9577b3404abe3d",
  //     __v: 0,
  //     id: "658598bb3fe025183446eecc",
  //   },
  // ];

  // data = {
  //   _id: "6585745e5c2d80dfc6dad49d",
  //   code: "test",
  //   startTime: 15,
  //   endTime: 17,
  //   day: 1,
  //   lecturer: "6584d508f9af1a1765355bc7",
  //   subject: "6584d779ac9577b3404abe3d",
  //   __v: 0,
  //   id: "6585745e5c2d80dfc6dad49d",
  // };
  let smaller, bigger;
  let conflict = [];
  if(givenSubjects.length<=0)
  {
    return false;
  }
  givenSubjects.forEach((givenSubject) => {
    if (givenSubject.day === data.day) {
      if (givenSubject.startTime <= data.startTime) {
        smaller = givenSubject;
        bigger = data;
      } else {
        smaller = data;
        bigger = givenSubject;
      }
    }
    conflict.push(
      smaller.startTime <= bigger.startTime &&
        smaller.endTime > bigger.startTime
    );
  });
  return conflict.some((item) => item);
};

export {isSubjectUsed};
