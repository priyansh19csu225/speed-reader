import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import URL from '../../constants/urls';
import { useNavigate } from 'react-router';

const Root = styled('div')({
  // margin: '30px auto',
  // maxWidth: 600,
  padding: '16px',
  // textAlign: 'center',
});

const StyledButton = styled(Button)({
  marginBottom: '16px',
});

const StyledCard = styled(Card)({
  marginBottom: '8px',
});

const LandingPage = () => {
  const [expanded, setExpanded] = useState([]);

  const handleExpand = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const navigate = useNavigate();

  const questions = [
    {
      question: 'What is speed reading?',
      answer:
        'Speed reading is a technique that allows you to read faster without sacrificing comprehension. It involves using various strategies to increase reading speed and improve reading efficiency.',
    },
    {
      question: 'Can anyone learn speed reading?',
      answer:
        'Yes, speed reading is a skill that can be learned and developed by anyone with practice and proper training. It involves breaking old reading habits and adopting new techniques to improve reading speed and comprehension.',
    },
    {
      question:
        'Are speed reading techniques suitable for all types of reading materials?',
      answer:
        'Speed reading techniques can be applied to various types of reading materials, including books, articles, reports, and online content. However, the effectiveness may vary depending on the complexity and formatting of the text. It is recommended to adapt the techniques based on the specific material and purpose of reading.',
    },
    {
      question: 'How long does it take to become proficient in speed reading?',
      answer: `The time it takes to become proficient in speed reading varies from person to person. It depends on factors such as the individual's reading habits, current reading speed, dedication to practice, and consistency. With regular practice and focused effort, significant improvements in reading speed and comprehension can be achieved in a matter of weeks or months.`,
    },
    {
      question: 'Can speed reading improve comprehension as well?',
      answer:
        'Yes, speed reading techniques are designed to improve both reading speed and comprehension. While the primary focus is on increasing reading speed, the techniques also emphasize developing better reading habits, such as effective scanning, skimming, and active engagement with the text. By applying these strategies, you can enhance your overall reading experience and understanding of the content.',
    },
  ];

  return (
    <Root className="mb-5 pb-5">
      <div class="row">
        <div class="mt-3 d-flex justify-content-center headline-2-bold color-1F2830">
          <b>Read Faster. Learn Smarter.</b>
        </div>
        <span class="d-flex justify-content-center headline-6 text-center mb-5">
          <b>
            Unlock the Power of Speed Reading and Supercharge Your Learning!{' '}
          </b>
        </span>
      </div>
      <Typography variant="h6" className="mb-5 color-5B5B5B heading-4">
        Speed reading is a technique that enables you to read faster and more
        efficiently. By employing specific strategies, such as eliminating
        subvocalization (pronouncing words internally) and utilizing peripheral
        vision, you can significantly increase your reading speed while
        maintaining comprehension. Speed reading techniques also involve
        skimming and scanning text, focusing on key information, and reducing
        unnecessary eye movements. With practice and training, you can improve
        your reading speed and absorb information more effectively. Start your
        speed reading journey today and experience the benefits of accelerated
        learning and enhanced productivity.
      </Typography>
      <StyledButton
        variant="contained"
        color="primary"
        sx={{ marginBottom: '30px' }}
        onClick={() => navigate(URL.READ)}
      >
        Start Now
      </StyledButton>
      <div className="d-flex flex-column w-100 justify-content-between">
        {questions.map((q, index) => (
          <StyledCard key={index} onClick={() => handleExpand(index)}>
            <CardContent className="row-11">
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'bold' }}
                className="d-flex justify-content-between"
              >
                <p>{q.question}</p>
                {expanded[index] ? (
                  <ExpandLessIcon color="primary" />
                ) : (
                  <ExpandMoreIcon color="primary" />
                )}
              </Typography>
            </CardContent>
            {expanded[index] && (
              <CardContent>
                <Typography variant="body1">{q.answer}</Typography>
              </CardContent>
            )}
          </StyledCard>
        ))}
      </div>
    </Root>
  );
};

export default LandingPage;
