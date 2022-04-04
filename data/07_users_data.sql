insert into
  users (name, email, password, user_image, phone_number)
values
  (
    "손성호",
    "seongho@gmail.com",
    "12345!!",
    "images/profile/profile_sample.jpeg",
    "010-7551-5576"
  );

insert into
  users (name, email, password)
values
  (
    "김연주",
    "jenny.likes.breeze@gmail.com",
    "12345@@"
  ),
  ("이택우", "leetekwoo@gmail.com", "12345##"),
  ("설혜원", "mixiwana@gmail.com", "12345$$"),
  ("마승우", "aktmddn322@naver.com", "12345%%");

insert into
  users(name, email, password, is_deleted)
values
  (
    "김코드(삭제된 유저임.)",
    "kimcode@gmail.com",
    "12345**",
    true
  );