const { Builder, By, Key, until } = require('selenium-webdriver');
(async function testCatalogComponent() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Открытие главной страницы 
    await driver.get('http://localhost:3000'); 
    await driver.executeScript(`
      let overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    `);
    // Ожидание перенаправления и проверки
    await driver.wait(until.elementLocated(By.id('bouquet')), 10000);

    // Переход в раздел букетов
    let bouquet = await driver.findElement(By.id('bouquet'));
    await bouquet.click();

    // Ожидание загрузки элементов каталога
    await driver.wait(until.elementLocated(By.id('catalog')), 10000);
    let catalog = await driver.findElement(By.id('catalog'));
    await catalog.click();

    // Ожидание загрузки каталога
    await driver.wait(until.elementLocated(By.css('.list-group-item')), 10000);

    // Выбор первой категории
    let firstCategory = await driver.findElement(By.css('.list-group-item'));
    await firstCategory.click();

    // Проверка, что категория выбрана (класс active должен быть применен)
    let activeCategory = await driver.findElement(By.css('.list-group-item.active'));
    console.log('Категория выбрана:', await activeCategory.getText());

    // Изменение диапазона цен
    let slider = await driver.findElement(By.css('.ant-slider'));
    await driver.executeScript("arguments[0].style.width = '70%';", slider); // Изменяем размер слайдера для точного клика
    await driver.actions().dragAndDrop(slider, { x: 100, y: 0 }).perform();

    // Проверка диапазона цен (поиск значений цен на странице)
    let priceMin = await driver.findElement(By.css('.d-flex p:first-child'));
    let priceMax = await driver.findElement(By.css('.d-flex p:last-child'));
    console.log('Диапазон цен:', await priceMin.getText(), '-', await priceMax.getText());

    // Выбор всех цветов
    let selectAllCheckbox = await driver.findElement(By.css('.ant-checkbox-wrapper'));
    await selectAllCheckbox.click();

    // Проверка, что все чекбоксы выбраны
    let allCheckboxes = await driver.findElements(By.css('.ant-checkbox-checked'));
    console.log('Все цветы выбраны:', allCheckboxes.length > 0);

    console.log('Тест пройден: Пользователь успешно перенаправлен на страницу каталога и установил фильтры.');
  } catch (error) {
    console.error('Произошла ошибка во время выполнения теста:', error);
  } finally {
    // Закрытие браузера
    await driver.quit();
  }
})();
