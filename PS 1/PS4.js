console.log("------- Password Validation -------");
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,20}$/;
  return passwordRegex.test(password);
}
// console.log(isValidPassword("Password@123"));

console.log("------- White Space Validation -------");
function trimWhiteSpace(str) {
  return str?.trim();
}
// console.log(trimWhiteSpace(" Password@123 "));

console.log("------- Remove Special Characters -------");
function removeSpecialCharacters(str) {
  return str?.replace(/[^a-zA-Z0-9]/g, "");
}
// console.log(removeSpecialCharacters("Password@123"));

console.log("------- Phone Number Format -------");
function formatPhoneNumber(phoneNumber) {
  return phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}
// console.log(formatPhoneNumber("1234567890"));

console.log("------- Valid User Name -------");
function isValidUserName(userName) {
  const userNameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return userNameRegex.test(userName);
}
// console.log(isValidUserName("hello123_"));

console.log("------- Capitalized First Latter -------");
function capitalizeFirstLetter(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}
// console.log(capitalizeFirstLetter("hello"));

console.log("------- Extract Domain From Email -------");
function extractDomainFromEmail(email) {
  return email?.split("@")[1];
}
// console.log(extractDomainFromEmail("0XKQH@example.com"));

console.log("------- Reverse String -------");
function reverseString(str) {
  return str?.split("").reverse().join("");
}
// console.log(reverseString("hello"));

console.log("------- Palindrome String -------");
function isPalindrome(str) {
  return str?.toLowerCase() === str?.toLowerCase().split("").reverse().join("");
}
// console.log(isPalindrome("racecar"));

console.log("------- Replace Spaces -------");
function replaceSpaces(str) {
  return str?.replace(/ /g, "_");
}
// console.log(replaceSpaces("hello world"));

console.log("------- Extract Numbers -------");
function extractNumbers(str) {
  return str?.match(/\d+/g)?.join("-");
}
// console.log(extractNumbers("hello 123 world"));

console.log("------- Validate URL -------");
function validateURL(url) {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)*[\w-]+(\.[a-z]{2,})+(:\d+)?(\/.*)?$/;
  return urlRegex.test(url);
}
console.log(validateURL("https://www.example.com"));

console.log("------- Masked Email -------");
function maskEmail(email) {
  const [username, domain] = email.split("@");
  const maskedUsername = username.slice(0, 1) + "*".repeat(username.length - 1);
  return maskedUsername + "@" + domain;
}
console.log(maskEmail("a@example.com"));
