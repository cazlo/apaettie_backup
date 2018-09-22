import React from 'react';
import { FaPieChart, FaHandGrabO, FaFileTextO, FaLinkedinSquare, FaGithub, FaGraduationCap, FaCogs } from "react-icons/lib/fa";
// eslint-disable-next-line
import { Container, Row, Col, Card, CardHeader, CardText,CardImg, CardDeck, CardSubtitle,
    CardBody, CardTitle, CardColumns} from 'reactstrap';

const Experience = () => (
  <div>
    <h2> <FaPieChart /> Professional Experience</h2>
    <br />
    <h4>Software Engineer at <a href='http://www.coxautoinc.com/'>Cox Automotive</a></h4>
    <h5>April 2017 - Present</h5>
    <h6>Data Solutions</h6>
    <ul>
      <li>Acted as technical lead driving technology and architectural decisions</li>
      <li>Created standardized vehicle language for use in multiple business units</li>
      <li>Created single point of ingestion, maintenance, and viewing for vehicle catalog data</li>
      <li>Simplified complicated configuration logic by searching for tautologies, and removing unsatisfiable expressions using MinSAT</li>
      <li>Participated in API design with direct feedback from internal consumers</li>
      <li>Automated integration testing using localstack</li>
      <li>Created infrastructure as code using terraform</li>
    </ul>
    <h5>May 2015 - April 2017</h5>
    <h6>Dealer.com Inventory</h6>
    <ul>
      <li>Worked with enterprise Java, mostly with Spring and Spring-boot and AWS deployments</li>
      <li>Acted as technical lead driving technology and architectural decisions</li>
      <li>Created system to migrate image hosting to the cloud via S3</li>
      <li>Member of scrum team which develops and maintains microservice applications which aggregate and serve vehicle data in a scalable way</li>
      <li>Set up and maintained system to migrate the source of truth for incentive data to a more performant and reliable technology stack</li>
      <li>Integrated with automated deployment tools to support continuous deployment and integration</li>
      <li>Installed monitoring and alerting to get increased visibility into key performance indicators of the overall system</li>
      <li>Created internal applications to ease troubleshooting issues and testing</li>
      <li>Reacted to production issues through an on call system</li>
    </ul>
    <br />
    <h4>Dev/OPS intern at <a href='http://www.capitalsoft.com/'>CaptialSoft</a></h4>
    <h5>March 2014 - May 2015</h5>
    <ul>
      <li>Generally participated in frontend and backend development</li>
      <li>Designed javascript interface for GIS leveraging <a href='http://openlayers.org/'>OpenLayers</a></li>
      <li>Designed/updated interface for document management system</li>
      <li>Implemented new ant build process which greatly reduced build time and otherwise increased productivity</li>
      <li>Wrote technical documentation for the code base and end-user help system</li>
      <li>Setup and administered servers for SVN, Bugzilla, Oracle Database and Weblogic</li>
    </ul>
    <br />
    <h4>Various Retail</h4>
    <ul>
      <li>Employed steadily in various retail positions since high school</li>
      <li>Never less than 1 year in a position</li>
      <li>Full employment list available upon request</li>
    </ul>
  </div>
);

const Skills = () => (
  <Row>
    <Col sm='6' md='4'>
      <h5>Backend Programming languages</h5>
      <ul>
        <li>Java (J2EE, EJB, JSP, Swing, Android, Spring, Spring boot)</li>
        <li>Javascript (node, ES6 - ES8)</li>
        <li>Python</li>
        <li>C# (.Net)</li>
        <li>Groovy (Grails)</li>
        <li>C/C++</li>
      </ul>
      <h5>Frontend Technologies</h5>
      <ul>
        <li>Javascript (ES5 - ES8)</li>
        <li>HTTP 5</li>
        <li>React/Preact</li>
        <li>Angular 1</li>
        <li>Basic CSS</li>
      </ul>
      <h5>Scripting languages</h5>
      <ul>
        <li>BASH</li>
        <li>VBScript</li>
      </ul>
    </Col>
    <Col sm='6' md='4'>
      <h5>Version control</h5>
      <ul>
        <li>Git</li>
        <li>SVN</li>
        <li>Amazon S3 Versioning</li>
      </ul>
      <h5>Databases/Document stores</h5>
      <ul>
        <li>Elasticsearch</li>
        <li>H2</li>
        <li>MongoDb</li>
        <li>MySql</li>
        <li>Oracle</li>
        <li>Postgres</li>
      </ul>
    </Col>
    <Col sm='6' md='4'>
      <h5>Misc. Tools</h5>
      <ul>
        <li>NewRelic</li>
        <li>SumoLogic</li>
        <li>Graphite</li>
        <li>Unix command line tools</li>
        <li>PagerDuty</li>
        <li>Puppet</li>
        <li>Docker</li>
        <li>AWS</li>
        <li>Maven/Ant</li>
        <li>Npm/Yarn</li>
        <li>CircleCI</li>
        <li>RabbitMQ</li>
      </ul>
    </Col>
  </Row>
);

const Summary = () => (
  <Container fluid>
    <Row>
      <Col xs='10' sm='10' md='12'>
        <ul className='lead'>
          <li>
                  I love creating software and have experience in all facets of development.
          </li><li>
                  I am knowledgeable and proficient with data structures, algorithms, UI and UX development, etc.
          </li><li>
                  I focus on results and pay close attention to details.
          </li>
        </ul>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className='lead'>
          I am currently working at Cox Automotive as a Software Engineer/Tech Lead on the Data Solutions team.
          I am always on the lookout for interesting opportunities to experiment with the latest technologies.
        </p>
      </Col>
    </Row>
  </Container>
);

const Education = () => (
  <Row>
    <Col>
      <h4>B.S. Computer Science <br /><a href='http://www.utdallas.edu/'>University of Texas at Dallas</a></h4>
      <h5>August 2009 - December 2015</h5>
      <br />
      <ul>
        <li>GPA: 3.174</li>
        <li>Major GPA: 3.876</li>
      </ul>
    </Col>
    <Col>
      <h5>Interesting elective projects</h5>
      <ul>
        <li><a href='https://github.com/cazlo/exploring-machine-learning'>Machine learning</a></li>
        <li><a href='https://github.com/cazlo/ctf/tree/master/ctf'>Artificial Intelligence</a></li>
        <li><a href='https://github.com/cazlo/academic-stuff/tree/master/java/network-stack-sim'>Advanced Networking</a></li>
        <li><a href='https://github.com/cazlo/heli-madness'>Software Engineering</a></li>
      </ul>
    </Col>
  </Row>
);

const VersionCard = (props) => (
  <Card >
    <CardBody className='text-center'>
      <CardTitle>
        <a href={props.link}>{props.linkComponent}</a>
      </CardTitle>
      <CardSubtitle><a href={props.link}>{props.name}</a></CardSubtitle>
    </CardBody>
  </Card>
);

const AlternativeVersions = () => (
  <Container >
    <Row>
      <h2><FaHandGrabO className='text-dark' /> Alternative Resume Formats</h2>
    </Row>
    <Row>
      <CardColumns />
      <VersionCard
        link='http://andrewpaettie.com/static/resume/resume-Andrew-Paettie.pdf'
        name='PDF'
        linkComponent={(<img src='/img/pdf.png' alt='The resume of Andrew Paettie in PDF format' />)}
      />
      <VersionCard
        link='http://andrewpaettie.com/static/resume/resume-Andrew-Paettie.docx'
        name='docx'
        linkComponent={(<FaFileTextO className='text-dark' size='5x' />)}
      />
      <VersionCard
        link='https://www.linkedin.com/in/andrew-paettie-26859584'
        name='LinkedIn'
        linkComponent={(<FaLinkedinSquare className='text-dark' size='5x' />)}
      />
      <VersionCard
        link='https://github.com/cazlo/'
        name='Github'
        linkComponent={(<FaGithub className='text-dark' size='5x' />)}
      />
    </Row>
  </Container>
);

const Resume = (props) => (
  <Container>
    <h2>About Me</h2>
    <Row>
      <Summary />
    </Row>
    <hr />
    <h2> <FaGraduationCap /> Education</h2>
    <br />
    <Education />
    <hr />
    <Row>
      <Col>
        <Experience />
      </Col>
    </Row>
    <hr />
    <h2> <FaCogs /> Skills</h2>
    <br />
    <Skills />
    <hr />
    <Row >
      <AlternativeVersions />
    </Row>
  </Container>
);

export default Resume;