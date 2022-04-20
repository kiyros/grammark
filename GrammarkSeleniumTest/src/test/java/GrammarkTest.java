import junitparams.JUnitParamsRunner;
import junitparams.Parameters;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

@RunWith(JUnitParamsRunner.class)
public class GrammarkTest {
    private static final String LOCAL_URL ="http://localhost:4200/";
    private static WebDriver driver;

    @BeforeClass
    public static void setUp(){
        System.setProperty("webdriver.chrome.driver", "chromedriverV101.exe");
        driver = new ChromeDriver();
    }

    // Check local URL
    // RUN 'ng serve' ON PROJECT BEFORE TEST!!
    @Test
    public void testLoadingGrammark() {
        driver.get(LOCAL_URL);
    }

    // Check invalid user inputs
    @Test
    @Parameters({"","1"})
    public void testInvalidUserInput(String userInput){
        driver.get(LOCAL_URL);
        WebElement textBox = driver.findElement(By.cssSelector("#userinput"));
        textBox.clear();
        textBox.sendKeys( userInput);
        WebElement submit = driver.findElement(By.cssSelector("#submitbutton"));
        submit.click();

        // Switching to Alert
        Alert alert = driver.switchTo().alert();
        // dismiss the alert
        driver.switchTo().alert().dismiss();
    }


    // Check valid user input
    @Test
    public void testSubmitUserInput(){
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "This is a test input");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();
    }


    @Test
    public void testUserInputNoError(){
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "An example text that got no error.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement passVoice = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)"));
        // test if passive voice instances = 0
        Assert.assertEquals("0(0%)",passVoice.getAttribute("innerHTML").toString());

        WebElement wordiness = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)"));
        // test if wordiness instances = 0
        Assert.assertEquals("0(0%)",wordiness.getAttribute("innerHTML").toString());

        WebElement acaStyle = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)"));
        // test if acaStyle instances = 0
        Assert.assertEquals("0(0%)",acaStyle.getAttribute("innerHTML").toString());

        WebElement grammar = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)"));
        // test if grammar instances = 0
        Assert.assertEquals("0(0%)",grammar.getAttribute("innerHTML").toString());

        WebElement normalizations = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)"));
        // test if normalizations instances = 0
        Assert.assertEquals("0(0%)",normalizations.getAttribute("innerHTML").toString());

        WebElement sentences = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)"));
        // test if sentences instances = 0
        Assert.assertEquals("0(0%)",sentences.getAttribute("innerHTML").toString());

        WebElement eggcorns = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(7) > td:nth-child(2)"));
        // test if sentences instances = 0
        Assert.assertEquals("0(0%)",eggcorns.getAttribute("innerHTML").toString());

        WebElement transition = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(8) > td:nth-child(2)"));
        // test if sentences instances = 0
        Assert.assertEquals("0(0%)",transition.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithPassiveVoiceError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "A movie is going to be watched by us tonight.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement passVoice = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)"));
        Assert.assertEquals("1(100%)",passVoice.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithWordinessError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "A movie is going to be watched by us tonight.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement wordiness = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)"));
        Assert.assertEquals("1(100%)",wordiness.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithAcademicStyleError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "I have always fed my dog the dog food that comes in the big green bag.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement acaStyle = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)"));
        Assert.assertEquals("4(25%)",acaStyle.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithGrammarError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "She try and fix it.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement grammar = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)"));
        Assert.assertEquals("1(100%)",grammar.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithEggcornError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "biting my time.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement eggcorns = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(7) > td:nth-child(2)"));
        Assert.assertEquals("1(100%)",eggcorns.getAttribute("innerHTML").toString());
    }

    @Test
    public void testUserInputWithTransitionError() {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "to sum up this is a test.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();

        WebElement transition = driver.findElement(By.cssSelector("body > app-root > app-overview > div > div.column1 > div > table > tbody > tr:nth-child(8) > td:nth-child(2)"));
        Assert.assertEquals("1(100%)",transition.getAttribute("innerHTML").toString());
    }

    @Test
    @Parameters({"2,passive-voice-fix","3,wordiness-fix","4,academic-style-fix","5,grammar-fix","6,nominalizations-fix","7,sentences-fix","8,eggcorns-fix","9,transitions-fix"})
    public void testRehighlightWithErrorInput(String featureNum, String feature) {
        driver.get(LOCAL_URL);
        WebElement userInput = driver.findElement(By.cssSelector("#userinput"));
        userInput.clear();
        userInput.sendKeys( "to sum up this is a test.");
        WebElement submitButton = driver.findElement(By.cssSelector("#submitbutton"));
        submitButton.click();
        WebElement selectFeature = driver.findElement(By.cssSelector("body > app-root > app-overview > mat-toolbar > a:nth-child(" + featureNum + ")"));
        selectFeature.click();
        WebElement userInputFeature = driver.findElement(By.cssSelector("#userinput"));
        userInputFeature.clear();
        userInputFeature.sendKeys( "");
        WebElement rehighlight;
        //there are 2 diff design for button
        try{
            rehighlight = driver.findElement(By.cssSelector("body > app-root > app-"+ feature +" > div:nth-child(4) > div.column1 > button"));
        }catch(org.openqa.selenium.NoSuchElementException e){
            rehighlight = driver.findElement(By.cssSelector("body > app-root > app-"+ feature+" > div > div.column1 > button"));
        }
        rehighlight.click();

        // Switching to Alert
        Alert alert = driver.switchTo().alert();
        // dismiss the alert
        driver.switchTo().alert().dismiss();
    }


}
