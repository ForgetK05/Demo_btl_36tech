document.addEventListener("DOMContentLoaded", function () {
  //lấy dữ liệu từ thẻ 
  const input = document.getElementById("search-input");
  const resultBox = document.getElementById("search-result");

  const cards = document.querySelectorAll(".card_box");

  //  tạo mảng lưu thẻ 
  let courses = [];

  function xuLyTiengViet(str) {
    return str
      .normalize('NFD')             // normallize dùng để tách dấu : vd : kiên => k i e mũ n
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu :  k i e mũ n => k i e n
      .replace(/đ/g, 'd')          
      .replace(/Đ/g, 'D')           
      .toLowerCase()                
      .trim();                      
  }

  // Lấy dữ liệu khóa học

  // dùng vòng lặp để lấy dữ liệu từ thẻ 
  cards.forEach(card => {
    const titleEl = card.querySelector(".info a");
    const imgEl = card.querySelector("img");


    // lấy được dữ liệu thì đẩy nó vào mảng => mảng dùng push, set=> dùng add 
    courses.push({
      title: titleEl.innerText.trim(), // trim cắt khoảng trắng 2 bên 
      link: titleEl.getAttribute("href"),
      image: imgEl.getAttribute("src")
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

    if (matched.length === 0) {
      resultBox.innerHTML = `
        <div class="search-empty">
          Không tìm thấy khóa học
        </div>
      `;
    } else {
      matched.forEach(course => {
        const item = document.createElement("a");
        item.className = "search-result-item";
        item.href = course.link; 

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
  document.addEventListener("click", function (e) { // e là đối tượng click vào (thẻ html, a , div ,,,) closest thì thằng cha gần nhất 
    // nếu đối tượng click vào không nằm trong thẻ cha thì không hiện dropdown của search !
    if (!e.target.closest(".search-wrapper")) {
      resultBox.style.display = "none";
    }
  });
});
