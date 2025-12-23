
  //lấy dữ liệu từ thẻ 
  const input = document.getElementById("search-input");
  const resultBox = document.getElementById("search-result");

  const cards = document.querySelectorAll(".card_box");

  //  tạo mảng lưu thẻ 
  let courses = [];

  function xuLyTiengViet(str) {
    return str
      .normalize('NFD')             // normallize dùng để tách dấu : vd : kiên => k i e ^ n
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu :  k i e ^ n => k i e n
      .replace(/đ/g, 'd')   // xử lý đ sang d       
      .replace(/Đ/g, 'D')   // xủ lý Đ sàn D        
      .toLowerCase()                
      .trim();                      
  }

  // Lấy dữ liệu khóa học

  // dùng vòng lặp để lấy dữ liệu từ thẻ 
  cards.forEach(card => {
    const title_course = card.querySelector(".info a");
    const img_course = card.querySelector("img");


    // lấy được dữ liệu thì đẩy nó vào mảng => mảng dùng push, set=> dùng add 
    courses.push({
      title: title_course.innerText.trim(), // trim cắt khoảng trắng 2 bên 
      link: title_course.getAttribute("href"),
      image: img_course.getAttribute("src")
    });
  });

  input.addEventListener("input", function () {// tạo sự kiện người dùng nhấn click thì hàm hđ
    const keyword = input.value.toLowerCase().trim();
    resultBox.innerHTML = "";// xóa tìm kiếm cũ 

    if (!keyword) {
      resultBox.style.display = "none";
      return;
    }

    const matched = courses.filter(course => {
      const xuLyTitle = xuLyTiengViet(course.title); // dùng để xử lý tiêu đề 
      const xulyKeyword = xuLyTiengViet(keyword);// dùng để xủ lý từ khóa người dùng nhập
      return xuLyTitle.includes(xulyKeyword); // trả về kết quả từ khóa người dùng nhập trùng với title include()
    });
    // nếu không tìm thấy từ nào trùng mới khóa học thì 
    if (matched.length === 0) {
      resultBox.innerHTML = `
        <div class="search-empty">
          Không tìm thấy khóa học
        </div>
      `;
    } else {
      matched.forEach(course => {
        const item = document.createElement("a"); // tạo thẻ a 
        item.className = "search-result-item"; // gắn class cho thẻ a đó
        item.href = course.link; // gắn link của khóa học vado thẻ a 

        // đây là nội dùng của dropdown sreach có định dạng ảnh + tên khóa 
        item.innerHTML = `
          <img src="${course.image}" alt="">
          <span>${course.title}</span>
        `;


        // dùng để thêm phần tử item và resultbox
        resultBox.appendChild(item);
      });
    }

    resultBox.style.display = "block";
  });

  // Click ra ngoài thì ẩn
  document.addEventListener("click", function (e) { // e là đối tượng click vào (thẻ html, a , div ,,,) closest tìm thằng cha gần nhất 
    // nếu đối tượng click vào không nằm trong thẻ cha(.search-wrapper) thì không hiện dropdown của search !
    if (!e.target.closest(".search-wrapper")) {
      resultBox.style.display = "none";
    }
  });

