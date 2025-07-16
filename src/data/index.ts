export const genderOptions = ['Male', 'Female', 'Unisex'];
export const incentivesMoodOptions = [
    'Slightly Bad (Less Bad Incentive)',
    'More Bad (Still a Bad Incentive)',
    'Badass (Dirty Incentive)',
    'Ultra Badass (Dark Badass)',
    "I'm a Saint (Good Incentive)",
];

export const incentivesNatureOptions = [
    'Celebrities',
    'Players',
    'Unisex',
    'Movies',
    'TV Shows',
    'Holidays',
    'Hobbies',
    'Expenses',
    'Sexual Orientation',
    'Occupation',
];

export const genderCelebritiesOptions = ['Male', 'Female', 'Unisex'];
export const professionOptions = [
    'Politicians',
    'Movie Stars',
    'Porn Stars',
    'Influencers',
    'Musicians',
    'Hispanic',
    'Italian',
    'Asian',
    'French'
];



// <CustomDropdown
// label="Gender"
// options={genderCelebritiesOptions}
// values={values.celebrityGender}
// onSelect={(val) => setFieldValue('celebrityGender', val)}
// className="w-1/2"
// placeholder="Select Gender"
// error={errors.celebrityGender}
// touched={touched.celebrityGender}
// name="celebrityGender"
// errorClassName="h-4"
// />
// <CustomDropdown
// label="Profession/Nationality"
// options={professionOptions}
// values={values.celebrityProfession}
// onSelect={(val) => setFieldValue('celebrityProfession', val)}
// className="w-1/2"
// placeholder="Select Profession"
// error={errors.celebrityProfession}
// touched={touched.celebrityProfession}
// name="celebrityProfession"
// errorClassName="h-4"
// />  



// <CustomInput
// label="Celebrity Name"
// name="celebrityName"
// value={values.celebrityName}
// onChange={(e) => setFieldValue('celebrityName', e.target.value)}
// placeholder="Enter Celebrity Name"
// error={errors.celebrityName}
// touched={touched.celebrityName}
// />