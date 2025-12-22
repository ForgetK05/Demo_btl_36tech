document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  const resultBox = document.getElementById("search-result");

  const cards = document.querySelectorAll(".card_box");
  let courses = [];

  // Lấy dữ liệu khóa học
  cards.forEach(card => {
    const titleEl = card.querySelector(".info a");
    const imgEl = card.querySelector("img");

    courses.push({
      title: titleEl.innerText.trim(),
      link: titleEl.getAttribute("href"),
      image: imgEl.getAttribute("src")
    });
  });

  input.addEventListener("input", function () {
    const keyword = input.value.toLowerCase().trim();
    resultBox.innerHTML = "";

    if (!keyword) {
      resultBox.style.display = "none";
      return;
    }

    const matched = courses.filter(course =>
      course.title.toLowerCase().includes(keyword)
    );

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

        resultBox.appendChild(item);
      });
    }

    resultBox.style.display = "block";
  });

  // Click ra ngoài thì ẩn
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-wrapper")) {
      resultBox.style.display = "none";
    }
  });
});
