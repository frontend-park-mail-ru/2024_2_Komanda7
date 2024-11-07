async function loadCategories() {
  const selectElement = document.createElement('select');
  try {
    const request = { headers: {} };
      const response = await api.get('/categories', request);
      const categories = await response.json();

      console.log(categories);

      // Заполнение выпадающего списка
      categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id; // id категории
          option.textContent = category.name; // название категории
          selectElement.appendChild(option);
      });
      
  } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
  }
  return categorySelect;
}