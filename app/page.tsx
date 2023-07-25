'use client'
import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import html2pdf from 'html2pdf.js';


interface WorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  description: string;
}

interface Education {
  school: string;
  date: string;
  degree: string;
  gpa: string;
  additionalInfo: string;
}

const CvContent = ({
  name,
  email,
  phone,
  experiences,
  educations,
  fontFamily,
}: {
  name: string;
  email: string;
  phone: string;
  experiences: WorkExperience[];
  educations: Education[];
  fontFamily: string;
}) => {
  return (
    <Box p={2}>
      <Box mb={4} textAlign="center">
        <Typography variant="h4">CV</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5" align="center">
          Personal Information
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="h6" style={{ marginLeft: '8px' }}>
            {name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <EmailIcon fontSize="large" />
          <Typography variant="h6" style={{ marginLeft: '8px' }}>
            {email}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <PhoneIcon fontSize="large" />
          <Typography variant="h6" style={{ marginLeft: '8px' }}>
            {phone}
          </Typography>
        </Box>
      </Box>
      <Box my={2}>

        <Typography variant="h6"><WorkIcon />Work Experience</Typography>
        {experiences.map((experience, index) => (
          <Box key={index} mt={2} p={2} border={1} borderColor="grey.300" borderRadius={4}>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Company: {experience.company}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Job Title: {experience.jobTitle}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Date: {experience.date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Description: {experience.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box my={2}>
        <Typography variant="h6"> <SchoolIcon />Education</Typography>
        {educations.map((education, index) => (
          <Box key={index} mt={2} p={2} border={1} borderColor="grey.300" borderRadius={4}>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                School: {education.school}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Date: {education.date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Degree: {education.degree}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                GPA: {education.gpa}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>

              <Typography variant="body2" fontWeight="bold" ml={1}>
                Additional Information: {education.additionalInfo}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addExperience = () => {
    setExperiences([...experiences, { company: '', jobTitle: '', date: '', description: '' }]);
  };

  const addEducation = () => {
    setEducations([...educations, { school: '', date: '', degree: '', gpa: '', additionalInfo: '' }]);
  };

  const pdfExportRef = useRef(null);

  const handleExportToPDF = () => {
    if (!isClient) {
      return;
    }

    const element = pdfExportRef.current;
    if (!element) return;

    const opt = {
      margin: 10,
      filename: 'my_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    import('html2pdf.js').then((html2pdfModule) => {
      const html2pdf = html2pdfModule.default || html2pdfModule;
      html2pdf().from(element).set(opt).save();
    });
  };

  const [selectedStyle, setSelectedStyle] = useState(1);

  const styles = [
    {
      backgroundColor: '#f5f5f5',
      color: 'black',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif',
    },
    {
      backgroundColor: '#CCFFE5',
      color: 'black',
      padding: '1rem',
      fontFamily: 'Verdana, sans-serif',
    },
    {
      backgroundColor: '#63A5E8',
      color: 'black',
      padding: '1rem',
      fontFamily: 'Helvetica, sans-serif',
    },
  ];

  const getSelectedStyle = () => {
    return styles[selectedStyle - 1];
  };

  const handleExperienceChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  return (
    <Grid container spacing={2} pl={6} pt={6}>
      <Grid item xs={12} sm={6}>
        <Box p={2} border={1} borderColor="grey.300" borderRadius={4}>
          <Typography variant="h5">Personal Information</Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>

        <Box p={2} border={1} borderColor="grey.300" borderRadius={4} mt={2}>
          <Typography variant="h6">Work Experience</Typography>
          {experiences.map((experience, index) => (
            <Box key={index} mt={index > 0 ? 2 : 0}>
              <TextField
                label="Company"
                value={experience.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Job Title"
                value={experience.jobTitle}
                onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date"
                value={experience.date}
                onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={experience.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Box>
          ))}
          <Button color="secondary" onClick={addExperience}>
            + Add Experience
          </Button>
        </Box>

        <Box p={2} border={1} borderColor="grey.300" borderRadius={4} mt={2}>
          <Typography variant="h6">Education</Typography>
          {educations.map((education, index) => (
            <Box key={index} mt={index > 0 ? 2 : 0}>
              <TextField
                label="School"
                value={education.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date"
                value={education.date}
                onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Degree"
                value={education.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="GPA"
                value={education.gpa}
                onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Additional Information"
                value={education.additionalInfo}
                onChange={(e) => handleEducationChange(index, 'additionalInfo', e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            </Box>
          ))}
          <Button color="secondary" onClick={addEducation}>
            + Add Education
          </Button>
        </Box>
        <Button color="primary" onClick={() => setSelectedStyle(1)}>
          Style One
        </Button>
        <Button color="primary" onClick={() => setSelectedStyle(2)}>
          Style Two
        </Button>
        <Button color="primary" onClick={() => setSelectedStyle(3)}>
          Style Three
        </Button>
        <Button color="primary" onClick={handleExportToPDF}>
          Export to PDF
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          ref={pdfExportRef}
          style={{
            backgroundColor: getSelectedStyle().backgroundColor,
            color: getSelectedStyle().color,
            padding: '1rem',
            fontFamily: getSelectedStyle().fontFamily,
            margin: '1rem',
          }}
        >
          <CvContent
            name={name}
            email={email}
            phone={phone}
            experiences={experiences}
            educations={educations}
            fontFamily={styles[selectedStyle - 1].fontFamily}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}