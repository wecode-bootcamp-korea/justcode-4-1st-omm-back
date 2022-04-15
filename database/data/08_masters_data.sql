insert into
  masters (user_id, name, address_id, detail_address_id)
values
  (1, 'kimcode', 1, 2);

insert into
  masters (
    user_id,
    address_id,
    detail_address_id,
    name,
    master_image,
    intro,
    start_time,
    end_time,
    work_experience,
    employee_number
  )
values
  (
    2,
    2,
    1,
    'chiocode',
    "/images/profile/profile_sample.jpeg",
    "hello world",
    '2022-01-01 09:00',
    '2022-01-01 18:00',
    5,
    10
  );