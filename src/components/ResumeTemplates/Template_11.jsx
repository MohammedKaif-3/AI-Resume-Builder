import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_11 = ({ resumeData }) => {
    return (
        <StyledPage $resumelineheight={resumeData.resumelineheight}>
            <TopVisual>
                <BadgeInitials $background={resumeData.theme?.background}>
                    {resumeData.firstname?.[0]}{resumeData.lastname?.[0]}
                </BadgeInitials>
                <PhotoFrame $heading={resumeData.theme?.heading}>
                    {resumeData.profileimg && <img src={resumeData.profileimg} alt="profile" />}
                </PhotoFrame>
            </TopVisual>

            <InfoPanel>
                <div>
                    <NameText  $heading={resumeData.theme?.heading}>
                        <span>{resumeData.firstname}</span> <strong>{resumeData.lastname}</strong>
                    </NameText>
                    <TitleText>{resumeData.jobtitle}</TitleText>
                </div>
                <ContactGroup>
                    {resumeData.phone && <ContactItem><strong>Phone:</strong> {resumeData.phone}</ContactItem>}
                    {resumeData.email && <ContactItem><strong>Email:</strong> {resumeData.email}</ContactItem>}
                    {resumeData.linkedin && (
                        <ContactItem>
                            <strong>LinkedIn:</strong>{' '}
                            <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer">
                                {resumeData.linkedin.replace(/^https?:\/\//, '')}
                            </a>
                        </ContactItem>
                    )}
                    {resumeData.github && (
                        <ContactItem>
                            <strong>GitHub:</strong>{' '}
                            <a href={`https://${resumeData.github}`} target="_blank" rel="noopener noreferrer">
                                {resumeData.github.replace(/^https?:\/\//, '')}
                            </a>
                        </ContactItem>
                    )}
                    {resumeData.website && (
                        <ContactItem>
                            <strong>Website:</strong>{' '}
                            <a href={`https://${resumeData.website}`} target="_blank" rel="noopener noreferrer">
                                {resumeData.website.replace(/^https?:\/\//, '')}
                            </a>
                        </ContactItem>
                    )}
                </ContactGroup>
            </InfoPanel>

            <SplitSection>
                <LeftWing>
                    {resumeData.skills?.length > 0 && (
                        <SectionBox>
                            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills || 'Skills'}</SectionTitle>
                            <PillGroup>
                                {resumeData.skills.map((skill, i) => (
                                    <SkillPill $background={resumeData.theme?.background} key={i}>{skill}</SkillPill>
                                ))}
                            </PillGroup>
                        </SectionBox>
                    )}

                    {resumeData.projects?.length > 0 && (
                        <SectionBox>
                            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects || 'Projects'}</SectionTitle>
                            {resumeData.projects.map((proj, i) => (
                                <CardBlock key={i}>
                                    <CardTop>
                                        <h4>{proj.name}</h4>
                                        {proj.github && (
                                            <IconLink href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                                                ↗
                                            </IconLink>
                                        )}
                                    </CardTop>
                                    <CardDesc dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                                    {proj.techStack?.length > 0 && <CardMeta>Tech: {proj.techStack.join(', ')}</CardMeta>}
                                </CardBlock>
                            ))}
                        </SectionBox>
                    )}

                    {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
                        section.type === "detailed" && (
                            <SectionBox key={idx}>
                                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                                {Object.entries(section.items).map(([key, item]) => (
                                    <CardBlock key={key}>
                                        {item.title && <CardTop>{item.title} {item.link && (
                                            <IconLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                                                ↗
                                            </IconLink>
                                        )}</CardTop>}
                                        {item.date && <CardMeta>{item.date}</CardMeta>}
                                        {
                                            item.description && (
                                                <CardDesc dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                                            )
                                        }
                                    </CardBlock>
                                ))}
                            </SectionBox>
                        )
                    ))}
                </LeftWing>

                <RightWing>
                    {resumeData.profile && (
                        <SectionBox>
                            <SectionTitle $heading={resumeData.theme?.heading}>Profile</SectionTitle>
                            <TextBlock dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
                        </SectionBox>
                    )}

                    {resumeData.experience?.length > 0 && (
                        <SectionBox>
                            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience || 'Experience'}</SectionTitle>
                            {resumeData.experience.map((exp, i) => (
                                <Entry key={i}>
                                    <h4>{exp.position}</h4>
                                    <HeadingAndDate>
                                        <i>{exp.company}</i>
                                        <span>{exp.startdate} - {exp.enddate}</span>
                                    </HeadingAndDate>
                                    <TextBlock dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
                                </Entry>
                            ))}
                        </SectionBox>
                    )}

                    {resumeData.education?.length > 0 && (
                        <SectionBox>
                            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education || 'Education'}</SectionTitle>
                            {resumeData.education.map((edu, i) => (
                                <Entry key={i}>
                                    <h4>{edu.degree}{edu.field && ` in ${edu.field}`}</h4>
                                    <i>{edu.institution}</i>
                                    <HeadingAndDate>
                                        <span>{edu.startdate} - {edu.enddate}</span>
                                        {edu.score && <small>Score: {edu.score}</small>}
                                    </HeadingAndDate>
                                </Entry>
                            ))}
                        </SectionBox>
                    )}

                    {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
                        section.type === "simple" && (
                            <SectionBox key={idx}>
                                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                                <PillGroup>
                                    {Object.entries(section.items).map(([key, val]) => <SkillPill $background={resumeData.theme?.background} key={key}>{val}</SkillPill>)}
                                </PillGroup>
                            </SectionBox>
                        )
                    ))}
                </RightWing>
            </SplitSection>
        </StyledPage>
    );
};

export default Template_11;

const StyledPage = styled.div`
  width: 210mm;
  height: 297mm;
  color: #1a1a1a;
  padding: 40px;
  font-family: 'Raleway', sans-serif;
  font-size: 11.5px;
  margin: 0;
  line-height: ${props => props.$resumelineheight || '1.6'};
`;

const ContactGroup = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4px 12px;
  margin: 0;
  margin-top: 5px;
  font-size: 10.5px;
  color: #444;

  a {
    color: #000;
    text-decoration: none;
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 6px;
  margin: 0;
  align-items: center;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const TopVisual = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-between;
`;

const BadgeInitials = styled.div`
  background-color: ${props => props.$background || '#eee'};;
  color: #000;
  font-weight: bold;
  margin: 0;
  font-size: 30px;
  padding: 18px 24px;
  border-radius: 50% 20% 50% 20%;
`;

const PhotoFrame = styled.div`
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    margin: 0;
    border-radius: 30% 70% 70% 30%;
    border: 3px solid ${props => props.$heading || '#333'};;
  }
`;

const InfoPanel = styled.div`
  text-align: center;
  margin: 0;
  margin: 10px 0 40px;
`;

const NameText = styled.h1`
  font-size: 38px;
  margin: 0;
  color: ${props => props.$heading || '#333'};
  font-family: 'Lato', serif;
  letter-spacing: 1px;
  span { font-weight: 300; }
  strong { font-weight: 800; font-size: 13px; text-transform: uppercase; }
`;

const TitleText = styled.h2`
  font-size: 13px;
  font-style: italic;
  color: #666;
  margin: 0;
  margin-bottom: 10px;
`;

const SplitSection = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  margin: 0;
`;

const LeftWing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 0;
`;

const RightWing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 0;
`;

const SectionBox = styled.section``;

const SectionTitle = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  color: ${props => props.$heading || '#333'};
  margin-bottom: 10px;
  margin: 0;
  border-left: 3px solid ${props => props.$heading || '#333'};
  padding-left: 10px;
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
`;

const SkillPill = styled.span`
  font-size: 10px;
  background-color: ${props => props.$background || '#eee'};;
  color: #000;
  margin: 0;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 20% 5% 20% 5%;
`;

const CardBlock = styled.div`
  background: #fff;
  border-radius: 6px;
  margin: 5px 0;
  border: 1px solid #ddd;
  padding: 12px 16px;
`;

const CardTop = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-between;
`;

const IconLink = styled.a`
  font-size: 12px;
  color: #000;
  margin: 0;
`;

const CardDesc = styled.div`
  font-size: 11px;
  color: #333;
  * {
    margin: 0;
  }
  ul, ol{
    padding-left: 30px;
  }
`;

const CardMeta = styled.div`
  font-size: 10px;
  color: #888;
  margin: 0;
  margin-top: 6px;
`;

const TextBlock = styled.div`
  font-size: 10.5px;
  color: #333;
  ul, ol { padding-left: 18px; }
`;

const Entry = styled.div`
  margin-bottom: 14px;
  h4 {
    font-size: 11.5px;
    margin: 0;
  }
  i {
    font-size: 10px;
    color: #888;
  }
  span, small {
    display: block;
    font-size: 10px;
    color: #999;
  }
`
