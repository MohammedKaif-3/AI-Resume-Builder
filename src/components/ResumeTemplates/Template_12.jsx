import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_12 = ({ resumeData }) => {
    return (
        <StyledPage $resumelineheight={resumeData.resumelineheight}>
            <SlantedHeader $accent={resumeData.theme?.background}>
                <HeaderText $heading={resumeData.theme?.heading}>
                    <h1>{resumeData.firstname} {resumeData.lastname}</h1>
                    <h2>{resumeData.jobtitle}</h2>
                </HeaderText>
            </SlantedHeader>

            <MainContent>
                <ZigZagSection>
                    <LeftBlock>
                        {resumeData.phone || resumeData.email || resumeData.linkedin || resumeData.github || resumeData.website && (
                            <SectionTitle $heading={resumeData.theme?.heading}>Contact</SectionTitle>
                        )}
                        <ContactList>
                            {resumeData.phone && (
                                <ContactItem><strong>Phone: </strong> {resumeData.phone}</ContactItem>
                            )}
                            {resumeData.email && (
                                <ContactItem><strong>Email: </strong> {resumeData.email}</ContactItem>
                            )}
                            {resumeData.linkedin && (() => {
                                const fullUrl = resumeData.linkedin.startsWith("http")
                                    ? resumeData.linkedin
                                    : `https://${resumeData.linkedin}`;
                                const displayText = fullUrl.replace(/^https?:\/\//, "");

                                return (
                                    <ContactItem>
                                        <strong>LinkedIn: </strong>
                                        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                            {displayText}
                                        </a>
                                    </ContactItem>
                                );
                            })()}

                            {resumeData.github && (() => {
                                const fullUrl = resumeData.github.startsWith("http")
                                    ? resumeData.github
                                    : `https://${resumeData.github}`;
                                const displayText = fullUrl.replace(/^https?:\/\//, "");

                                return (
                                    <ContactItem>
                                        <strong>Github: </strong>
                                        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                            {displayText}
                                        </a>
                                    </ContactItem>
                                );
                            })()}

                            {resumeData.website && (() => {
                                const fullUrl = resumeData.website.startsWith("http")
                                    ? resumeData.website
                                    : `https://${resumeData.website}`;
                                const displayText = fullUrl.replace(/^https?:\/\//, "");

                                return (
                                    <ContactItem>
                                        <strong>Website: </strong>
                                        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                                            {displayText}
                                        </a>
                                    </ContactItem>
                                );
                            })()}
                        </ContactList>

                        {resumeData.profile && (
                            <Section>
                                <SectionTitle $heading={resumeData.theme?.heading}>Profile</SectionTitle>
                                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
                            </Section>
                        )}

                        {resumeData.education?.length > 0 && (
                            <Section>
                                <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education || 'Education'}</SectionTitle>
                                {resumeData.education.map((edu, i) => (
                                    <ModernCard key={i} $accent={resumeData.theme?.heading}>
                                        <HeadingAndDate>
                                            <h4>{edu.degree}{edu.field && ` in ${edu.field}`}</h4>
                                            <span>{edu.startdate} - {edu.enddate}</span>
                                        </HeadingAndDate>
                                        <HeadingAndDate>
                                            <i>{edu.institution}</i>
                                            {edu.score && <small>{edu.score}</small>}
                                        </HeadingAndDate>
                                    </ModernCard>
                                ))}
                            </Section>
                        )}

                        {resumeData.skills?.length > 0 && (
                            <>
                                <Section>
                                    <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills || 'Skills'}</SectionTitle>
                                    <BadgeWrap>
                                        {resumeData.skills.map((skill, i) => (
                                            <FancySkill key={i}>{skill}</FancySkill>
                                        ))}
                                    </BadgeWrap>
                                </Section>
                            </>
                        )}

                        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
                            section.type === "simple" && (
                                <Section key={idx}>
                                    <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                                    <BadgeWrap>
                                        {Object.entries(section.items).map(([key, val]) => <FancySkill key={key}>{val}</FancySkill>)}
                                    </BadgeWrap>
                                </Section>
                            )
                        ))}
                    </LeftBlock>

                    <RightBlock>


                        {resumeData.experience?.length > 0 && (
                            <Section>
                                <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience || 'Experience'}</SectionTitle>
                                {resumeData.experience.map((exp, i) => (
                                    <ModernCard key={i} $accent={resumeData.theme?.heading}>
                                        <h4>{exp.position}</h4>
                                        <HeadingAndDate>
                                            <i>{exp.company}</i>
                                            <span>{exp.startdate} - {exp.enddate}</span>
                                        </HeadingAndDate>
                                        <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
                                    </ModernCard>
                                ))}
                            </Section>
                        )}

                        {resumeData.projects?.length > 0 && (
                            <Section>
                                <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects || 'Projects'}</SectionTitle>
                                {resumeData.projects.map((proj, i) => (
                                    <ModernCard key={i} $accent={resumeData.theme?.heading}>
                                        <HeadingAndDate>
                                            <h4>{proj.name}</h4>
                                            {proj.github && <a href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer"><span>↗</span></a>}
                                        </HeadingAndDate>
                                        <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                                        {proj.techStack?.length > 0 && <small>Tech: {proj.techStack.join(', ')}</small>}
                                    </ModernCard>
                                ))}
                            </Section>
                        )}

                        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
                            section.type === "detailed" && (
                                <Section key={idx}>
                                    <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                                    {Object.entries(section.items).map(([key, item]) => (
                                        <ModernCard key={key}>
                                            <HeadingAndDate>
                                                {item.title && <h4>{item.title} {item.link && (
                                                    <a href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                                                        <span style={{ marginLeft: '10px' }}>↗</span>
                                                    </a>
                                                )}</h4>}
                                                {item.date && <i>{item.date}</i>}
                                            </HeadingAndDate>

                                            {
                                                item.description && (
                                                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                                                )
                                            }
                                        </ModernCard>
                                    ))}
                                </Section>
                            )
                        ))}
                    </RightBlock>
                </ZigZagSection>
            </MainContent>
        </StyledPage>
    );
};

export default Template_12;

const StyledPage = styled.div`
  width: 210mm;
  height: 297mm;
  background: #fefefe;
  font-family:  'Poppins';
  color: #222;
  line-height: ${props => props.$resumelineheight || '1.6'};
`;

const HeadingAndDate = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-between;
`;

const SlantedHeader = styled.div`
  background: ${props => props.$accent || '#333'};
  color: white;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
  padding: 50px 40px 80px;
`;

const Section = styled.div`
margin: 0;
margin-top: 15px;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 32px;
    margin: 0;
    color: ${props => props.$heading || '#fff'};
    font-family: 'Lato';
    strong { text-transform: uppercase; }
  }
  h2 {
    font-size: 14px;
    font-style: italic;
    color: #888;
    margin-top: 4px;
    font-family: 'Poppins', sans-serif;
  }
`;

const Text = styled.div`
  font-size: 11px;
  color: #333;
  * {
    margin: 0;
  }
  ul, ol{
    padding-left: 30px;
  }
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 1px 0;
  a {
    color: #333;
    text-decoration: none;
  }
`;

const MainContent = styled.div`
  padding: 30px 40px;
`;

const ZigZagSection = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
`;

const LeftBlock = styled.div`
  font-size: 10.5px;
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 11px;
  margin-bottom: 8px;
  text-transform: uppercase;
  color: ${props => props.$heading || '#000'};
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 10px;
  li {
    margin-bottom: 5px;
  }
`;

const BadgeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const FancySkill = styled.span`
  background: radial-gradient(circle at 30% 30%, #fefefe, #e0e0e0);
  padding: 6px 14px;
  border-radius: 14px 4px 14px 4px;
  font-size: 10px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  color: #222;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.6), 1px 1px 2px rgba(0,0,0,0.05);
`;

const ModernCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-left: 3px solid ${props => props.$accent || '#444'};
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 5px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  h4 {
    margin: 0;
    font-size: 11px;
    font-family: 'Poppins', sans-serif;
  }
  i, span, small {
    font-size: 10px;
    color: #666;
  }
`;
