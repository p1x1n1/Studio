const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testAuthComponent() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Открытие страницы авторизации
    await driver.get('http://localhost:3000/login'); // Убедитесь, что URL правильный
    // Ожидание, пока поле логина станет доступным
    await driver.wait(until.elementLocated(By.id('login')), 10000);
    // Удаление overlay, если он существует
    await driver.executeScript(`
      let overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    `);
    // Заполнение поля логина
    let loginInput = await driver.findElement(By.id('login'));
    await loginInput.sendKeys('abazina'); // Ввод логина

    // Заполнение поля пароля
    let passwordInput = await driver.findElement(By.id('pass'));
    await passwordInput.sendKeys('abazina'); //Ввод пароля

    // Нажатие на кнопку 'Войти'
    let authButton = await driver.findElement(By.id('AuthButton'));
    await authButton.click();

    // Ожидание перенаправления и проверки
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000); // Убедитесь, что URL правильный

    console.log('Тест пройден: Пользователь успешно авторизован и перенаправлен на главную страницу.');
  } catch (error) {
    console.error('Произошла ошибка во время выполнения теста:', error);
  } finally {
    // Закрытие браузера
    await driver.quit();
  }
})();
