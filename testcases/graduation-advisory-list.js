module.exports = {
  // NHÓM 1: HIỂN THỊ MẶC ĐỊNH
  defaultDisplay: {
    name: "1. Hiển thị mặc định",
    cases: [
      {
        title: "Mở màn hình Graduation advisory từ menu bên trái",
        type_id: 1,
        priority_id: 1,
        refs: "3.1.1.3; 3.1.1.5; 3.1.1.7 (step 1)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: 'Ở menu bên trái, mục Libraries, bấm menu "Graduation advisory".',
            expected: 'Hiển thị màn hình "Graduation advisory" cùng các bộ lọc (filter controls).',
          },
        ],
      },
      {
        title: "Các bộ lọc có giá trị mặc định là All",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.6 (Filter controls)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Quan sát giá trị của 3 bộ lọc Type, Modified, Modified by.",
            expected: "Cả 3 bộ lọc Type, Modified, Modified by đều có giá trị mặc định là All.",
          },
        ],
      },
      {
        title: "Danh sách mặc định hiển thị tất cả tài liệu",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 1); 2.1.3; 2.1.4",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện Graduation advisory đã có tài liệu.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected:
              "Hiển thị tất cả tài liệu theo kết quả tìm kiếm mặc định (khớp giá trị ban đầu của bộ lọc). Áp dụng quy ước Pagination và Search result.",
          },
        ],
      },
      {
        title: "Bảng dữ liệu hiển thị đủ các cột",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.6 (Displayed data fields)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện Graduation advisory đã có tài liệu.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Quan sát các cột của bảng dữ liệu (Data grid).",
            expected:
              "Bảng có đủ các cột: Checkbox (chọn tài liệu), Type, Name, Modified, Modified by.",
          },
        ],
      },
      {
        title: "Cột Modified hiển thị đúng định dạng ngày giờ",
        type_id: 2,
        priority_id: 4,
        refs: "2.1.1; 3.1.1.6 (Displayed data fields)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện Graduation advisory đã có tài liệu.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Quan sát giá trị trong cột Modified.",
            expected: "Ngày giờ hiển thị theo định dạng dd/mm/yyyy hh:mm tt (ví dụ: 30/12/2011 10:02 AM).",
          },
        ],
      },
      {
        title: "Bố cục cơ bản của trang đúng quy ước",
        type_id: 2,
        priority_id: 4,
        refs: "2.1.2",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Quan sát bố cục của trang.",
            expected:
              "Tài khoản người dùng ở góc trên bên phải của header; banner thông tin nằm dưới header; ô Search nằm dưới banner, cùng thanh với menu Home ở bên trái; menu bên trái gồm các nhóm Pictures, Libraries, Lists, Discussions.",
          },
        ],
      },
    ],
  },
 
  // NHÓM 2: FILTER
  filter: {
    name: "2. Filter",
    cases: [
      {
        title: "Lọc tài liệu theo Type",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.6 (Filter controls); 3.1.1.7 (bước 2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện có tài liệu thuộc ít nhất 2 Type khác nhau.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Ở bộ lọc Type, chọn một Type có tài liệu.",
            expected: "Bộ lọc Type hiển thị giá trị vừa chọn.",
          },
          {
            content: "Bấm nút List (hoặc Search).",
            expected: "Hiển thị các tài liệu thỏa tiêu chí tìm kiếm đã chọn.",
          },
        ],
      },
      {
        title: "Lọc tài liệu theo Modified",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.6 (Filter controls); 3.1.1.7 (bước 2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện có tài liệu được sửa vào các thời điểm khác nhau.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Ở bộ lọc Modified, chọn một giá trị có tài liệu.",
            expected: "Bộ lọc Modified hiển thị giá trị vừa chọn.",
          },
          {
            content: "Bấm nút List (hoặc Search).",
            expected: "Hiển thị các tài liệu thỏa tiêu chí tìm kiếm đã chọn.",
          },
        ],
      },
      {
        title: "Lọc tài liệu theo Modified by",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.6 (Filter controls); 3.1.1.7 (step 2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện có tài liệu do ít nhất 2 người dùng khác nhau sửa.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Ở bộ lọc Modified by, chọn một người dùng.",
            expected: "Bộ lọc Modified by hiển thị giá trị vừa chọn.",
          },
          {
            content: "Bấm nút List (hoặc Search).",
            expected: "Hiển thị các tài liệu thỏa tiêu chí tìm kiếm đã chọn.",
          },
        ],
      },
    ],
  },
 
  // NHOM 3: FINDING RESULT
  findingResult: {
    name: "3. Finding result",
    cases: [
      {
        title: "Không có tài liệu khớp tiêu chí lọc thì hiển thị thông báo không tìm thấy",
        type_id: 2,
        priority_id: 1,
        refs: "2.1.4; 3.1.1.7 (step 2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Có tổ hợp tiêu chí lọc mà không tài liệu nào khớp.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Chọn tổ hợp tiêu chí lọc không có tài liệu nào khớp.",
            expected: "Các bộ lọc hiển thị đúng giá trị vừa chọn.",
          },
          {
            content: "Bấm nút List (hoặc Search).",
            expected:
              'Hiển thị thông báo "We did not find any results for xxx" phía trên Data grid. Không hiển thị tài liệu nào.',
          },
        ],
      },
      {
        title: "Có tài liệu khớp thì hiển thị dòng x-xx of yy results",
        type_id: 2,
        priority_id: 2,
        refs: "2.1.4; 3.1.1.7 (step 2)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện có tài liệu.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected: "Màn hình danh sách tài liệu được hiển thị.",
          },
          {
            content: "Chọn tiêu chí lọc có tài liệu khớp, bấm nút List (hoặc Search).",
            expected: 'Hiển thị dòng "x-xx of yy results" phía trên Data grid.',
          },
        ],
      },
    ],
  },
 
  // NHOM 4: PAGINATION
  pagination: {
    name: "4. Pagination",
    cases: [
      {
        title: "Có 21 tài liệu thì hiển thị vùng phân trang, mỗi trang tối đa 20 tài liệu",
        type_id: 2,
        priority_id: 1,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách kết quả có 21 tài liệu.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory".',
            expected:
              "Hiển thị vùng phân trang dạng ◄ xx / yy ►. Trang 1 hiển thị 20 tài liệu.",
          },
          {
            content: "Bấm biểu tượng ► để sang trang 2.",
            expected: "Trang 2 hiển thị 1 tài liệu còn lại.",
          },
        ],
      },
      {
        title: "Bấm biểu tượng ► chuyển sang trang kế tiếp",
        type_id: 2,
        priority_id: 1,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 3 trang trở lên. Đang ở trang 1.",
        custom_steps_separated: [
          {
            content: "Bấm biểu tượng ►.",
            expected: "Chuyển sang trang 2 và hiển thị đúng các tài liệu của trang 2.",
          },
        ],
      },
      {
        title: "Bấm biểu tượng ◄ quay về trang trước",
        type_id: 2,
        priority_id: 1,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 3 trang trở lên. Đang ở trang 2.",
        custom_steps_separated: [
          {
            content: "Bấm biểu tượng ◄.",
            expected: "Quay về trang 1 và hiển thị đúng các tài liệu của trang 1.",
          },
        ],
      },
      {
        title: "Bấm biểu tượng về trang đầu",
        type_id: 2,
        priority_id: 2,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 3 trang trở lên. Đang ở trang cuối.",
        custom_steps_separated: [
          {
            content: "Bấm biểu tượng về trang đầu (first page).",
            expected: "Chuyển về trang đầu tiên.",
          },
        ],
      },
      {
        title: "Bấm biểu tượng đến trang cuối",
        type_id: 2,
        priority_id: 2,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 3 trang trở lên. Đang ở trang 1.",
        custom_steps_separated: [
          {
            content: "Bấm biểu tượng đến trang cuối (last page).",
            expected: "Chuyển đến trang cuối cùng.",
          },
        ],
      },
      {
        title: "Vùng phân trang hiển thị đúng định dạng xx / yy",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.3",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có nhiều trang.",
        custom_steps_separated: [
          {
            content: "Quan sát vùng phân trang ở trang 2.",
            expected: "Vùng phân trang hiển thị theo định dạng ◄ xx / yy ►.",
          },
        ],
      },
      {
        title: "Phân trang đúng khi đã lọc kết quả",
        type_id: 2,
        priority_id: 2,
        refs: "2.1.3; 2.1.4; 3.1.1.7 (bước 2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Có tiêu chí lọc cho kết quả hơn 20 tài liệu.",
        custom_steps_separated: [
          {
            content: "Chọn tiêu chí lọc cho kết quả hơn 20 tài liệu, bấm nút List (hoặc Search).",
            expected:
              "Hiển thị vùng phân trang; mỗi trang tối đa 20 tài liệu của kết quả đã lọc; dòng x-xx of yy results phản ánh đúng kết quả đã lọc.",
          },
        ],
      },
    ],
  },
 
  // NHOM 5: SORT AND FILTER FOLLOWED BY ROW
  sortAndFilter: {
    name: "5. Sort and filter followed by row",
    cases: [
      {
        title: "Sắp xếp danh sách theo cột Name",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.5",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên.",
        custom_steps_separated: [
          {
            content: "Sắp xếp theo cột Name theo thứ tự tăng dần.",
            expected: "Danh sách được sắp xếp theo cột Name theo thứ tự tăng dần (ascending).",
          },
          {
            content: "Sắp xếp theo cột Name theo thứ tự giảm dần.",
            expected: "Danh sách được sắp xếp theo cột Name theo thứ tự giảm dần (descending).",
          },
        ],
      },
      {
        title: "Sắp xếp danh sách theo cột Type",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.5",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên thuộc các Type khác nhau.",
        custom_steps_separated: [
          {
            content: "Sắp xếp theo cột Type theo thứ tự tăng dần.",
            expected: "Danh sách được sắp xếp theo cột Type theo thứ tự tăng dần (ascending).",
          },
          {
            content: "Sắp xếp theo cột Type theo thứ tự giảm dần.",
            expected: "Danh sách được sắp xếp theo cột Type theo thứ tự giảm dần (descending).",
          },
        ],
      },
      {
        title: "Sắp xếp danh sách theo cột Modified",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.5",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên được sửa vào các thời điểm khác nhau.",
        custom_steps_separated: [
          {
            content: "Sắp xếp theo cột Modified theo thứ tự tăng dần.",
            expected: "Danh sách được sắp xếp theo cột Modified theo thứ tự tăng dần (ascending).",
          },
          {
            content: "Sắp xếp theo cột Modified theo thứ tự giảm dần.",
            expected: "Danh sách được sắp xếp theo cột Modified theo thứ tự giảm dần (descending).",
          },
        ],
      },
      {
        title: "Sắp xếp danh sách theo cột Modified by",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.5",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên do các người dùng khác nhau sửa.",
        custom_steps_separated: [
          {
            content: "Sắp xếp theo cột Modified by theo thứ tự tăng dần.",
            expected: "Danh sách được sắp xếp theo cột Modified by theo thứ tự tăng dần (ascending).",
          },
          {
            content: "Sắp xếp theo cột Modified by theo thứ tự giảm dần.",
            expected: "Danh sách được sắp xếp theo cột Modified by theo thứ tự giảm dần (descending).",
          },
        ],
      },
    ],
  },
 
  // NHOM 6: VALIDATION
  validation: {
    name: "6. Validation",
    cases: [
      {
        title: "R1: Không áp dụng bộ lọc nào thì hiển thị tất cả tài liệu",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.9 (R1)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Thư viện có tài liệu.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory", không thay đổi bất kỳ bộ lọc nào.',
            expected: "Các bộ lọc giữ nguyên giá trị mặc định.",
          },
          {
            content: "Bấm nút List (hoặc Search).",
            expected: "Hiển thị tất cả tài liệu.",
          },
        ],
      },
      {
        title: "R2: Chưa chọn tài liệu nào thì các menu liên quan không thể chọn",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.9 (R2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu và chưa tick chọn tài liệu nào.",
        custom_steps_separated: [
          {
            content: "Quan sát các menu View Properties, Edit Properties, Edit Document, Delete Document.",
            expected: "Các menu này không thể chọn (không khả dụng).",
          },
        ],
      },
      {
        title: "Chọn nhiều tài liệu bằng checkbox",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.6 (Displayed data fields)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 3 tài liệu trở lên.",
        custom_steps_separated: [
          {
            content: "Tick chọn 2 tài liệu trong danh sách.",
            expected: "Cả 2 tài liệu đều được chọn; các tài liệu còn lại không được chọn.",
          },
          {
            content: "Bỏ tick một trong hai tài liệu.",
            expected: "Chỉ tài liệu còn tick vẫn được chọn.",
          },
        ],
      },
      {
        title: "Chọn và bỏ chọn tất cả tài liệu",
        type_id: 2,
        priority_id: 3,
        refs: "3.1.1.6 (Displayed data fields)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên.",
        custom_steps_separated: [
          {
            content: "Tick chọn tất cả tài liệu.",
            expected: "Tất cả tài liệu được chọn.",
          },
          {
            content: "Bỏ chọn tất cả tài liệu.",
            expected: "Không còn tài liệu nào được chọn.",
          },
        ],
      },
    ],
  },
 
  // NHOM 7: CHUYEN USE-CASE
  useCaseNavigation: {
    name: "7. Chuyển use-case",
    cases: [
      {
        title: "Chọn tài liệu và bấm View Properties thì chuyển sang use-case View Properties",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 2.1)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Tick chọn một tài liệu, bấm menu View Properties.",
            expected: "Chuyển sang use-case View Properties.",
          },
        ],
      },
      {
        title: "Chọn tài liệu và bấm Edit Properties thì chuyển sang use-case Edit Properties",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 2.2)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Tick chọn một tài liệu, bấm menu Edit Properties.",
            expected: "Chuyển sang use-case Edit Properties.",
          },
        ],
      },
      {
        title: "Chọn tài liệu và bấm Edit Document thì chuyển sang use-case Edit Document",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 2.3)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Tick chọn một tài liệu, bấm menu Edit Document.",
            expected: "Chuyển sang use-case Edit Document.",
          },
        ],
      },
      {
        title: "Chọn một tài liệu và bấm Delete Document thì chuyển sang use-case Delete Document",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 2.4)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Tick chọn một tài liệu, bấm menu Delete Document.",
            expected: "Chuyển sang use-case Delete Document.",
          },
        ],
      },
      {
        title: "Chọn nhiều tài liệu và bấm Delete Document thì chuyển sang use-case Delete Document",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.7 (bước 2.4)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có từ 2 tài liệu trở lên.",
        custom_steps_separated: [
          {
            content: "Tick chọn 2 tài liệu, bấm menu Delete Document.",
            expected: "Chuyển sang use-case Delete Document.",
          },
        ],
      },
      {
        title: "Bấm menu Upload Document thì chuyển sang use-case Upload Document",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 3)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: "Bấm menu Upload Document.",
            expected: "Chuyển sang use-case Upload Document.",
          },
        ],
      },
      {
        title: "Bấm link Add Document thì chuyển sang use-case Upload Document",
        type_id: 2,
        priority_id: 1,
        refs: "3.1.1.7 (bước 3)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: "Bấm link Add Document.",
            expected: "Chuyển sang use-case Upload Document.",
          },
        ],
      },
    ],
  },
 
  // NHOM 8: PHAN QUYEN
  authorization: {
    name: "8. Phân quyền",
    cases: [
      {
        title: "IDHead xem được danh sách tài liệu",
        type_id: 1,
        priority_id: 1,
        refs: "3.1.1.2; 4.1 (Graduation advisory)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDHead.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Hiển thị danh sách tài liệu.",
          },
        ],
      },
      {
        title: "IDLecturer xem được danh sách tài liệu",
        type_id: 1,
        priority_id: 1,
        refs: "3.1.1.2; 4.1 (Graduation advisory)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản IDLecturer.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Hiển thị danh sách tài liệu.",
          },
        ],
      },
      {
        title: "Student xem được danh sách tài liệu",
        type_id: 1,
        priority_id: 1,
        refs: "3.1.1.2; 4.1 (Graduation advisory)",
        custom_preconds: "Đã đăng nhập thành công bằng tài khoản Student.",
        custom_steps_separated: [
          {
            content: 'Bấm menu "Graduation advisory" ở mục Libraries.',
            expected: "Hiển thị danh sách tài liệu.",
          },
        ],
      },
      {
        title: "Student chỉ có quyền View/Download, không có quyền Upload, Edit, Delete",
        type_id: 2,
        priority_id: 1,
        refs: "4.1 (Graduation advisory)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản Student. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Thử thực hiện các thao tác Upload, Edit và Delete tài liệu từ màn hình danh sách.",
            expected:
              "Student không thực hiện được các thao tác Upload, Edit, Delete (Student chỉ có quyền View/Download).",
          },
        ],
      },
      {
        title: "IDLecturer có quyền Upload, Edit nhưng không có quyền Delete",
        type_id: 2,
        priority_id: 1,
        refs: "4.1 (Graduation advisory)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDLecturer. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Thực hiện thao tác Upload và Edit tài liệu từ màn hình danh sách.",
            expected: "IDLecturer thực hiện được thao tác Upload và Edit.",
          },
          {
            content: "Thử thực hiện thao tác Delete tài liệu.",
            expected: "IDLecturer không thực hiện được thao tác Delete.",
          },
        ],
      },
      {
        title: "IDHead có quyền Upload, Edit và Delete",
        type_id: 2,
        priority_id: 1,
        refs: "4.1 (Graduation advisory)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Danh sách có tài liệu.",
        custom_steps_separated: [
          {
            content: "Thực hiện thao tác Upload, Edit và Delete tài liệu từ màn hình danh sách.",
            expected: "IDHead thực hiện được cả 3 thao tác Upload, Edit, Delete.",
          },
        ],
      },
      {
        title: "Bộ lọc Type chỉ hiển thị các Type mà người dùng có quyền truy cập",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.6 (Filter controls - Type)",
        custom_preconds:
          "Có tài khoản chỉ được truy cập một số Type. Đã đăng nhập bằng tài khoản đó.",
        custom_steps_separated: [
          {
            content: 'Mở màn hình "Graduation advisory", mở danh sách thả xuống của bộ lọc Type.',
            expected: "Danh sách chỉ hiển thị các Type mà người dùng đang đăng nhập có quyền truy cập.",
          },
        ],
      },
    ],
  },
 
  // NMHOM 9: ONSCREEN ERROR OR WARNING
  onscreenErrorOrWarning: {
    name: "9. Onscreen error or warning",
    cases: [
      {
        title: "Hiển thị icon lỗi khi có lỗi",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.6 (Onscreen error or warning)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Đang ở màn hình Graduation advisory và có tình huống phát sinh lỗi (SRS không nêu điều kiện cụ thể).",
        custom_steps_separated: [
          {
            content: "Thực hiện thao tác trên màn hình dẫn đến lỗi.",
            expected: "Hiển thị icon dành cho lỗi (error).",
          },
        ],
      },
      {
        title: "Hiển thị icon cảnh báo khi có cảnh báo",
        type_id: 2,
        priority_id: 3,
        refs: "2.1.6 (Onscreen error or warning)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Đang ở màn hình Graduation advisory và có tình huống phát sinh cảnh báo (SRS không nêu điều kiện cụ thể).",
        custom_steps_separated: [
          {
            content: "Thực hiện thao tác trên màn hình dẫn đến cảnh báo.",
            expected: "Hiển thị icon dành cho cảnh báo (warning).",
          },
        ],
      },
      {
        title: 'Hiển thị icon và link "Go back to site"',
        type_id: 2,
        priority_id: 3,
        refs: "2.1.6 (Onscreen error or warning)",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Có tình huống hệ thống hiển thị icon kèm link Go back to site (SRS không nêu điều kiện cụ thể).",
        custom_steps_separated: [
          {
            content: "Thực hiện thao tác dẫn đến tình huống đó.",
            expected: 'Hiển thị icon và link "Go back to site".',
          },
        ],
      },
      {
        title: "Bước 2 luồng chính: có lỗi thì hiển thị thông tin lỗi và quay lại bước 1",
        type_id: 2,
        priority_id: 2,
        refs: "3.1.1.7 (bước 2); 2.1.6",
        custom_preconds:
          "Đã đăng nhập thành công bằng tài khoản IDHead. Đang ở màn hình Graduation advisory.",
        custom_steps_separated: [
          {
            content:
              "Chọn tiêu chí lọc, bấm nút List (hoặc Search) trong trường hợp hệ thống phát hiện lỗi.",
            expected:
              "Hiển thị thông tin lỗi (theo mục Onscreen error and warning ở White page) và quay lại bước 1 của luồng chính (màn hình Graduation advisory với các bộ lọc).",
          },
        ],
      },
    ],
  },
};

