describe('Basic user flow for Website', () => {
  // First, visit the lab 6 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/');
  });

  // Check that no notes are on the page
  it('Initial Home Page - Check for 0 notes', async () => {
    console.log('Checking for notes...');
    const notes = await page.$$('.note');
    const numNotes = notes.length;

    expect(numNotes).toBe(0);
  });


  // clicking add note button adds 1 note to the existing count
  it('Make sure "Add Note" button adds a note to the page', async () => {
    console.log('Checking for a single note...');
    
    const addNoteBtn = await page.$('.add-note');
    await addNoteBtn.click();

    const notes = await page.$$('.note');
    const numNotes = notes.length;

    expect(numNotes).toBe(1);
  });

  // create new note and edit it check to see if content is saved
  it('Make sure we can edit the new note', async () => {
    console.log('Checking to make sure new note can be edited...');
    const addNoteBtn = await page.$('.add-note');
    await addNoteBtn.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('2');
    await page.keyboard.press('Tab');

    const localStorage = await page.evaluate(() => {
      return localStorage.getItem(localStorage.key(0));
    });
    const noteText = await JSON.parse(localStorage)[0].content;
    
    
    expect(noteText).toBe('2');

  }, 10000);

  // edit existing note and check to see if content is saved
  it('Make sure we can edit an existing note and the content is saved', async () => {
    console.log('Checking to make sure existing note can be edited...');
    
    const addNoteBtn = await page.$('.add-note');
    await addNoteBtn.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('hello');
    await page.keyboard.press('Tab');

    const localStorage = await page.evaluate(() => {
      return localStorage.getItem(localStorage.key(0));
    });
    console.log(localStorage);
    const noteText = await JSON.parse(localStorage)[1].content;

    expect(noteText).toBe('hello');
  }, 10000);

  // check localStorage to see if number of notes is the saved on refresh
  it('Checking to see if notes save on refresh', async () => {
    console.log('Making sure number of <.note> elements is 2');
    
    await page.reload();
    const localStorage = await page.evaluate(() => {
      return localStorage.getItem(localStorage.key(0));
    });
    const parsed = await JSON.parse(localStorage);
    expect(parsed.length).toBe(3);

  }, 2500);

  // delete first note and see if number of notes decreased by 1
  it('Checking to make sure delete functionality works', async () => {
    console.log('Checking number of notes should be one less after deleting...');
    
    let notes = await page.$$('.note');
    const numNotes = notes.length;
  
    await page.click('.note', { clickCount: 2 });

    notes = await page.$$('.note');
    expect(notes.length).toBe(numNotes - 1);
    

  }, 20000);

  // make sure localStorage has the right information about notes on refresh
  it('Checking to make sure localStorage has the right note content', async () => {
    console.log('Checking the localStorage...');
  
    await page.reload();
    const localStorage = await page.evaluate(() => {
      return localStorage.getItem(localStorage.key(0));
    });
    const parsed = await JSON.parse(localStorage);

    expect(parsed[0].content).toBe('hello');
    expect(parsed[1].content).toBe('');

  }, 20000);

  // add 10 notes and see if <.note> elements is 12
  it('Checking to make sure number of <.note> elements is 12', async () => {
    console.log('Checking the note count...');
    const addNoteBtn = await page.$('.add-note');
    
    for (let i = 0; i < 10; i ++) {
      await addNoteBtn.click();
    }

    const notes = await page.$$('.note');

    expect(notes.length).toBe(12);

  }, 20000);

  // delete all notes and make sure count is 0
  it('Checking to make sure number of <.note> elements is 0', async () => {
    console.log('Checking the note count...');
    let notes = await page.$$('.note');
    
    for (let i = 0; i < notes.length; i ++) {
      await page.click('.note', { clickCount: 2 });
    }

    notes = await page.$$('.note');

    expect(notes.length).toBe(0);

  }, 20000);
});
